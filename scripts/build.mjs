import { execSync } from 'node:child_process'
import { rmSync } from 'node:fs'

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
      'Se usa el cliente y el panel /admin ya versionados.\n'
  )
}

// Tina deja un .gitignore dentro de public/admin que oculta el panel del repo.
// Lo quitamos para poder versionar el panel (así /admin funciona en el primer
// deploy aunque tinacms build no corra).
try {
  rmSync('public/admin/.gitignore', { force: true })
} catch {}

run('next build')
