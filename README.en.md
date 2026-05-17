# mms-unxt (Nuxt PC/Site Scaffold)

English | [简体中文](README.md)

This folder hosts a **Nuxt 3** PC/site scaffold and demo templates. The main app lives under `mms-unxt/mms-ui-nuxt/`.

---

## Projects

| Path | Description |
|---|---|
| `mms-ui-nuxt/` | Nuxt 3 app: multiple site templates (template01~06), i18n, themes, auth state, and sample API layer |

---

## Quick Start (mms-ui-nuxt)

```bash
cd mms-unxt/mms-ui-nuxt
pnpm install   # or npm / yarn
pnpm dev
```

### Env modes

The scripts switch env via `NUXT_PUBLIC_APP_ENV`:

```bash
pnpm local
pnpm dev
pnpm prod
```

### Build & preview

```bash
pnpm build
pnpm preview
```
