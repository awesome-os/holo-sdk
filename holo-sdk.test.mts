import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  getSdkComponent,
  listAllSdkComponents,
  loadHoloSdkManifest,
} from './index.mts';

describe('awesome-os/holo-sdk umbrella manifest', () => {
  it('loads valid v11 / B8G v3 manifest with repository:// and project:// protocols', () => {
    const manifest = loadHoloSdkManifest();
    assert.equal(manifest.schema, 'awesome-os-holo-sdk-manifest-v1');
    assert.equal(manifest.abiMagic, '0x33564742');
    assert.equal(manifest.casLayout, 'v11');
    assert.equal(manifest.protocols.sourceOfTruth, 'repository://');
    assert.equal(manifest.protocols.projection, 'project://');
  });

  it('references all core, runtime, and forge repos via canonical repository:// URIs', () => {
    const all = listAllSdkComponents();
    assert.ok(all.length >= 23);
    for (const c of all) {
      assert.ok(
        c.repository.startsWith('repository://github.com/awesome-os/'),
        `Invalid repository URI for ${c.id}: ${c.repository}`,
      );
    }
    assert.equal(getSdkComponent('holo-go')?.repository, 'repository://github.com/awesome-os/go-lang@main');
    assert.equal(getSdkComponent('holo-dart')?.repository, 'repository://github.com/awesome-os/dart@main');
    assert.equal(getSdkComponent('gitaly')?.repository, 'repository://github.com/awesome-os/gitaly@main');
  });
});
