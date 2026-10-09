import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import sharp from 'sharp'
import { assets } from '@/content/assets'
import { offerings } from '@/content/offerings'
import { site } from '@/content/site'

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// The OG renderer cannot read variable fonts, so static TTFs live in assets-src/fonts.
export default async function OpengraphImage() {
  const root = process.cwd()
  const [display, body, mark] = await Promise.all([
    readFile(join(root, 'assets-src/fonts/BarlowCondensed-Bold.ttf')),
    readFile(join(root, 'assets-src/fonts/Barlow-Medium.ttf')),
    readFile(join(root, 'public/assets/logo-mark.png')),
  ])
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`
  const bg = assets.og
  // The OG renderer cannot decode WebP, so convert the background to JPEG (prerendered at build).
  const bgSrc = bg
    ? `data:image/jpeg;base64,${(
        await sharp(join(root, 'public', bg.src))
          .resize(1200, 630)
          .jpeg({ quality: 82 })
          .toBuffer()
      ).toString('base64')}`
    : null

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#006199',
        color: '#f3f1ec',
        fontFamily: 'Barlow',
      }}
    >
      {bgSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bgSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
        />
      ) : null}
      {/* With a background photo the scene carries the right side; otherwise a solid gold panel. */}
      <div
        style={{
          position: 'absolute',
          ...(bgSrc
            ? { right: 56, top: 56, width: 104 }
            : { right: 0, top: 0, bottom: 0, width: 340, background: '#f6b73c' }),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} alt="" width={bgSrc ? 104 : 208} height={bgSrc ? 90 : 180} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 72px',
          width: 860,
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#f6b73c',
          }}
        >
          {offerings.map((o) => o.name).join(' · ')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Barlow Condensed',
              fontSize: 132,
              lineHeight: 0.9,
              textTransform: 'uppercase',
            }}
          >
            Excellence
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Barlow Condensed',
              fontSize: 132,
              lineHeight: 0.9,
              textTransform: 'uppercase',
            }}
          >
            in&nbsp;<span style={{ color: '#f6b73c' }}>motion.</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div
            style={{
              fontFamily: 'Barlow Condensed',
              fontSize: 40,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 24, color: '#cfdde8' }}>
            Compton, California · Ten miles to the LA and Long Beach ports
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Barlow Condensed', data: display, weight: 700, style: 'normal' },
        { name: 'Barlow', data: body, weight: 500, style: 'normal' },
      ],
    },
  )
}
