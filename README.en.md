<div align="center">
   <br/>
   <a href="https://mmsadmin.cn">
     <img width="150" src="https://mmsadmin.cn/logo.png" alt="MMS logo">
   </a>
   <h1>Modular Management System (MMS)</h1>
   <p><strong>mms-pc · PC Portal / Website (Nuxt 3)</strong></p>
   <p><a href="https://mmsadmin.cn/">📘 Online Docs · mmsadmin.cn</a> · <a href="https://gitee.com/LumeCode/mms-pc">Gitee</a> · <a href="https://github.com/MrShanDev/mms-pc">GitHub</a></p>
   <br/>
</div>

English | [简体中文](README.md)

`mms-pc` is the **PC web / portal** of MMS, built with **Nuxt 3**. Server-side rendering gives it strong **SEO**. It ships **6 site templates** (`pages/template01~06`), **i18n** (`i18n/`), **multiple themes** (`themes/`: classic / modern), and a sample API layer (`api/`) for portal and website scenarios.

- Repository: <https://gitee.com/LumeCode/mms-pc> (public)
- Backend: open APIs served by `mms/mms-admin`; API endpoints are centralized in `api/config.ts`

---

## Tech Stack

- Nuxt 3 + Vue 3 + TypeScript
- Pinia / Vue Router
- `@nuxtjs/i18n`

## Requirements

- Node.js 18+

---

## Quick Start

```bash
npm install

# Local development (pick one environment)
npm run local   # local environment
npm run dev     # dev environment
npm run prod    # production config for debugging
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run local` / `dev` / `prod` | Start `nuxt dev` with the matching env variables |
| `npm run build` | Production build (`nuxt generate`), output in `.output/public` |
| `npm run generate` | Static site generation |
| `npm run preview` | Preview the build result locally |

---

## Build & Deploy

Run `npm run build`; the generated files land in the `.output/public` directory.

### Switching API configuration

Before deploying, edit the address constants at the top of `api/config.ts`:

- **Local**: `LOCAL_APP_URL`
- **Dev**: `DEV_APP_URL`
- **Production**: `PROD_APP_URL` (with the `/prod-api` path) and `PROD_WS_URL` (WebSocket)

### Deployment steps

1. Update the API configuration in `api/config.ts`
2. Run `npm run build`
3. Upload the contents of `.output/public` to the server
4. Configure the reverse-proxy rules for API endpoints

---

## License

MIT; see the [LICENSE](LICENSE) file.
