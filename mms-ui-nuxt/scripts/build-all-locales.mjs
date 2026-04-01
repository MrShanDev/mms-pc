/**
 * 从 en.json 派生各语言完整包（维护翻译时改 packs/*.mjs 后运行）
 * node scripts/build-all-locales.mjs
 * 仅覆盖「页面静态 UI」文案；业务/mock 数据见 utils/titaSiteContent.ts 与 i18n/CONVENTIONS.md
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildAr } from './packs/ar.mjs'
import { buildDe } from './packs/de.mjs'
import { buildEs } from './packs/es.mjs'
import { buildFr } from './packs/fr.mjs'
import { buildIt } from './packs/it.mjs'
import { buildKo } from './packs/ko.mjs'
import { buildPt } from './packs/pt.mjs'
import { buildRu } from './packs/ru.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const en = JSON.parse(fs.readFileSync(path.join(root, 'i18n/locales/en.json'), 'utf8'))

const d = (x) => JSON.parse(JSON.stringify(x))

const packs = {
  fr: () => buildFr(d(en)),
  de: () => buildDe(d(en)),
  es: () => buildEs(d(en)),
  ko: () => buildKo(d(en)),
  ru: () => buildRu(d(en)),
  pt: () => buildPt(d(en)),
  it: () => buildIt(d(en)),
  ar: () => buildAr(d(en))
}

for (const [code, fn] of Object.entries(packs)) {
  fs.writeFileSync(
    path.join(root, 'i18n/locales', `${code}.json`),
    JSON.stringify(fn(), null, 2) + '\n',
    'utf8'
  )
  console.log('locale written:', code)
}
