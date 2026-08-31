import { execSync } from 'node:child_process'

/**
 * Build de producción, resistente al primer deploy:
 *  1. `tinacms build` genera el cliente y el panel /admin. Si falla (p. ej. aún
 *     no está TINA_TOKEN en Vercel), se avisa y se sigue con el cliente que ya
 *     está versionado en tina/__generated__/.
 *  2. `next build` compila el sitio. Con o sin Tina Cloud indexado, las páginas
 *     se sirven desde el JSON local (ver lib/loadDoc.ts).
 */
const run = (cmd) => execSync(cmd, { stdio: 'inherit' })

try {
  run('tinacms build --skip-cloud-checks --skip-indexing')
} catch {
  console.warn(
    '\n⚠️  tinacms build no se pudo completar (¿falta TINA_TOKEN?). ' +
      'Se usa el cliente ya versionado en tina/__generated__/.\n'
  )
}

run('next build')
