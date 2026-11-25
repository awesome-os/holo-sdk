# Awesome-OS Holo SDK (`awesome-os/holo-sdk`)

> **Unified umbrella SDK for the Awesome-OS Holo Stack — referencing every core Holo component and sovereign upstream hard-fork via `repository://` and projecting them via `project://` over one `v11` Universal Object Store (`B8G_ABI_MAGIC_V3 = 0x33564742`).**

---

## Install & Verify

```powershell
# Windows (PowerShell)
irm https://awesome-os.com/install.ps1 | iex
```

```bash
# Linux / macOS
curl -fsSL https://awesome-os.com/install.sh | sh
```

```powershell
# Verify SDK manifest & repository:// references (Node 22+, zero dependencies)
node --test holo-sdk.test.mts
```

---

## Architecture

- **`repository://`** — Immutable Source of Truth (`v11/files/00..ff/<sha512>` blobs, Merkle trees, lockfiles, OCI layers, `.b8p` models).
- **`project://`** — 0-byte hardlink Virtual Worktree & Installation (`holo-project project://<runtime>/<entry>?from=repository://...`).
- **Central Documentation:** [`awesome-os/holo-compiler/docs/`](https://github.com/awesome-os/holo-compiler/tree/main/docs)

See [`holo-sdk.manifest.json`](./holo-sdk.manifest.json) and [`index.mts`](./index.mts) for the complete machine-readable SDK topology.

## Quick Install & Run (Windows / Linux / macOS)

```sh
# Install / hydrate from v11 CAS via holo-pm
holo-pm install repository://github.com/awesome-os/holo-sdk@main

# Or project & run directly via holo-project (0-byte hardlink)
holo-project "project://node/holo-sdk?from=repository://github.com/awesome-os/holo-sdk@main"
```
