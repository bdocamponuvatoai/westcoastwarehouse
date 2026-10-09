// Builds every favicon from the master monogram tile (assets-src/logo-mark.png).
// Replace that file with a high-resolution export of the logo tile and run `npm run icons`.
import sharp from 'sharp'

const SRC = 'assets-src/logo-mark.png'
const TILE = { r: 60, g: 92, b: 118, alpha: 1 } // slate blue sampled from the logo tile
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 }

async function square(size, { pad = 0, background = CLEAR } = {}) {
  const inner = Math.round(size * (1 - pad * 2))
  const mark = await sharp(SRC)
    .resize(inner, inner, { fit: 'contain', background: CLEAR, kernel: 'lanczos3' })
    .toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ compressionLevel: 9 })
}

const jobs = [
  ['app/icon.png', await square(512)],
  ['app/icon1.png', await square(32)],
  ['app/apple-icon.png', await square(180, { pad: 0.04, background: TILE })],
  ['public/assets/icon-maskable.png', await square(512, { pad: 0.2, background: TILE })],
]

for (const [out, img] of jobs) {
  await img.toFile(out)
  console.log('wrote', out)
}
