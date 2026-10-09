// Media pipeline.
//   npm run media -- photo <name>   assets-src/<name>.(png|jpg|jpeg|webp) → public/assets/<name>.webp
//                                   and prints the entry to paste into content/assets.ts
//   npm run media -- video <name>   assets-src/<name>.mp4 → seamless cross-dissolve loop
//                                   (webm + mp4 + poster, no audio). Requires ffmpeg on PATH.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const [, , kind, name] = process.argv
if (!kind || !name) {
  console.error('Usage: npm run media -- <photo|video> <name>')
  process.exit(1)
}

const find = (exts) => exts.map((e) => join('assets-src', `${name}.${e}`)).find(existsSync)

async function photo() {
  const src = find(['png', 'jpg', 'jpeg', 'webp'])
  if (!src) throw new Error(`No assets-src/${name}.(png|jpg|jpeg|webp) found`)
  const out = join('public/assets', `${name}.webp`)
  const info = await sharp(src)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(out)
  const blur = await sharp(src).resize(16).webp({ quality: 40 }).toBuffer()
  console.log(`wrote ${out} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)\n`)
  console.log(`  '${name}': {
    src: '/assets/${name}.webp',
    width: ${info.width},
    height: ${info.height},
    alt: 'DESCRIBE THE ACTUAL PHOTO',
    blurDataURL: 'data:image/webp;base64,${blur.toString('base64')}',
  },`)
}

function video() {
  const src = find(['mp4', 'mov', 'webm'])
  if (!src) throw new Error(`No assets-src/${name}.(mp4|mov|webm) found`)
  const ff = (args) =>
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' })
  const dur = Number(
    execFileSync('ffprobe', [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'csv=p=0',
      src,
    ])
      .toString()
      .trim(),
  )
  const fade = 1
  const loop = join('assets-src', `${name}.loop.mp4`)
  // Cross-dissolve the clip's tail into its head so the loop has no visible seam.
  ff([
    '-i',
    src,
    '-filter_complex',
    `[0:v]scale=1600:-2,fps=30,split[a][b];[a]trim=0:${dur - fade},setpts=PTS-STARTPTS[main];` +
      `[b]trim=${dur - fade}:${dur},setpts=PTS-STARTPTS[tail];[main][tail]xfade=transition=fade:duration=${fade}:offset=${dur - 2 * fade}[v]`,
    '-map',
    '[v]',
    '-an',
    loop,
  ])
  ff([
    '-i',
    loop,
    '-c:v',
    'libx264',
    '-crf',
    '28',
    '-preset',
    'slow',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-an',
    join('public/assets', `${name}.mp4`),
  ])
  ff([
    '-i',
    loop,
    '-c:v',
    'libvpx-vp9',
    '-crf',
    '38',
    '-b:v',
    '0',
    '-an',
    join('public/assets', `${name}.webm`),
  ])
  ff(['-i', loop, '-frames:v', '1', '-q:v', '3', join('assets-src', `${name}.poster.png`)])
  console.log(
    `wrote public/assets/${name}.(mp4|webm); run "npm run media -- photo ${name}.poster" for the poster`,
  )
}

if (kind === 'photo') await photo()
else if (kind === 'video') video()
else {
  console.error(`Unknown kind "${kind}"`)
  process.exit(1)
}
