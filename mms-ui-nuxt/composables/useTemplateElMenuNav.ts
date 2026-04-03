/** Element Plus 横向菜单：index 为完整路径，可含 #锚点（如 /template01#products）。 */
export function useTemplateElMenuNav() {
  const router = useRouter()

  function onMenuSelect(index: string) {
    if (!index || index.startsWith('sub-')) return
    const sharp = index.indexOf('#')
    if (sharp >= 0) {
      const path = index.slice(0, sharp)
      const hash = index.slice(sharp)
      void router.push({ path, hash })
    } else {
      void router.push(index)
    }
  }

  return { onMenuSelect }
}
