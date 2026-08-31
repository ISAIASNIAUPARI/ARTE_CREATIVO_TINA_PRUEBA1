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

// Los assets de /admin ya están versionados en el repo (generados localmente
// con el clientId correcto). No corremos tinacms build en Vercel para evitar
// que sobreescriba public/admin/index.html con la variable de entorno incorrecta.
try {
  rmSync('public/admin/.gitignore', { force: true })
} catch {}

run('next build')
