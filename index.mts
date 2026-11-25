/**
 * @file index.mts
 * @description Standalone programmatic entrypoint for `awesome-os/holo-sdk`.
 * Strictly `erasableSyntaxOnly: true`, zero external dependencies.
 */

import fs from 'node:fs';
import path from 'node:path';

export interface HoloSdkComponentRef {
  readonly id: string;
  readonly role?: string;
  readonly repository: string;
  readonly docs?: string;
}

export interface HoloSdkManifest {
  readonly schema: 'awesome-os-holo-sdk-manifest-v1';
  readonly abiMagic: '0x33564742';
  readonly casLayout: 'v11';
  readonly protocols: {
    readonly sourceOfTruth: 'repository://';
    readonly projection: 'project://';
  };
  readonly core: readonly HoloSdkComponentRef[];
  readonly toolchainsAndRuntimes: readonly HoloSdkComponentRef[];
  readonly forgeAndPlatform: readonly HoloSdkComponentRef[];
}

export const HOLO_SDK_MANIFEST_PATH: string = path.join(
  import.meta.dirname,
  'holo-sdk.manifest.json',
);

export function loadHoloSdkManifest(): HoloSdkManifest {
  return JSON.parse(
    fs.readFileSync(HOLO_SDK_MANIFEST_PATH, 'utf8'),
  ) as HoloSdkManifest;
}

export function listAllSdkComponents(): readonly HoloSdkComponentRef[] {
  const m = loadHoloSdkManifest();
  return [...m.core, ...m.toolchainsAndRuntimes, ...m.forgeAndPlatform];
}

export function getSdkComponent(id: string): HoloSdkComponentRef | undefined {
  return listAllSdkComponents().find((c) => c.id === id);
}
