// Web images live in public/assets as WebP. Run `npm run media -- photo <key>` to generate an
// entry, then paste it below. Keys without an entry render the designed fallback panel.

export type Asset = {
  src: string
  width: number
  height: number
  alt: string
  blurDataURL?: string
}

export type AssetKey =
  | 'h1-desktop'
  | 'h1-mobile'
  | 's1-warehousing'
  | 's2-trucking'
  | 's3-e-commerce'
  | 'e1-feature'
  | 'm1-port'
  | 'm2-receive'
  | 'm3-pick'
  | 'm4-ship'
  | 'w1-wide'
  | 'og'

// Native ratio of each frame. The rendered box always uses this ratio so photos are never cropped.
export const ratios: Record<AssetKey, [number, number]> = {
  'h1-desktop': [16, 9],
  'h1-mobile': [3, 4],
  's1-warehousing': [4, 3],
  's2-trucking': [4, 3],
  's3-e-commerce': [4, 3],
  'e1-feature': [4, 5],
  'm1-port': [1, 1],
  'm2-receive': [1, 1],
  'm3-pick': [1, 1],
  'm4-ship': [1, 1],
  'w1-wide': [16, 10],
  og: [1200, 630],
}

export const assets: Partial<Record<AssetKey, Asset>> = {
  'h1-desktop': {
    src: '/assets/h1-desktop-daylight.webp',
    width: 1600,
    height: 900,
    alt: 'A white Westcoast-branded tractor and trailer cross a container yard in daylight.',
    blurDataURL:
      'data:image/webp;base64,UklGRs4AAABXRUJQVlA4WAoAAAAQAAAADwAACAAAQUxQSFkAAAAFcBzJtqrM+W64SwBkSTTExtpXvHfwGCJiAu5KAWEwCiGT+F+gv2yTWDL6MIHUSsB89WE1aHvbMko4msd+PKq75azb7rrhQOn5mGURKWtGTb0p05MBYTBfAQBWUDggTgAAADACAJ0BKhAACQADgFoljAJ0fwAVfrLjEViAAP7toLtkNnltU/k5Nxp++nXj9hYUlfWkRrc0u1EqEyy9kHHmhOhRouPW0aKPKk/uVwAAAA==',
  },
  'h1-mobile': {
    src: '/assets/h1-mobile-daylight.webp',
    width: 1200,
    height: 1600,
    alt: 'A white Westcoast-branded tractor and trailer stand beneath port cranes in daylight.',
    blurDataURL:
      'data:image/webp;base64,UklGRkQBAABXRUJQVlA4WAoAAAAQAAAADwAAFAAAQUxQSKsAAAABuYzof2jkNrbt2g2svOm/MWW+A2Xeq4hFMJJZOPnBYiq8Asg8YgIm4M2volPnzvTJZ/DRe3vXidjVvqBmbg7bNYgZJkGXpGEKBFYaoDYEzJo2SxGkkcz0VzluKBJGJrT8On6KBaFiRxQJgmFYSUqIiUXAAbLpAMPRyOk2YiGknQ5SIA3nZllEzKC3rvHC5epuQzz31EPesePOBnP5zO/bJ66uOfh//OuqdwAAVlA4IHIAAADwAwCdASoQABUAPu1kqU2ppaOiMAgBMB2JQBOkCYhgagtZD5MPS7vwAP6QG5h3txxKZwgFBnlkIBEAIi4hJsgIY6MdaUkLDEEmQ3SeCoikt8mXnxkcBGQPiKDJIv5d2MKeWeHeAZ7vzvMw13aaZQYYAAA=',
  },
  's1-warehousing': {
    src: '/assets/s1-warehousing.webp',
    width: 1600,
    height: 1200,
    alt: 'A reach-truck operator lifts a wrapped pallet between high warehouse racks.',
    blurDataURL:
      'data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAgCdASoQAAwAA4BaJZQCdAYv1Vr+crNWwAD+7McxAwXi1av9vZZX9WTLCwVauLzHRIbzmGLMWOUAt/yZqxX+aBpmT147KRpE8X0MVWy519cThoWvwFlQAAA=',
  },
  's2-trucking': {
    src: '/assets/s2-trucking.webp',
    width: 1600,
    height: 1200,
    alt: 'A tractor-trailer parked at a distribution center loading dock at dawn, the driver’s arm at the window.',
    blurDataURL:
      'data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAQCdASoQAAwAA4BaJZwAAq7l+YWG4AD+7jW6NdDdCovihla/S/W1cT7iffxrH4gOuhgcqtgOMkLmWgOBRU9p7+VEjFRGWer6jjoUAAA=',
  },
  's3-e-commerce': {
    src: '/assets/s3-e-commerce.webp',
    width: 1600,
    height: 1200,
    alt: 'A fulfillment worker seals a parcel beside mailers and a handheld scanner.',
    blurDataURL:
      'data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQAgCdASoQAAwAA4BaJZACdAYvND8uYHHAAPfcIYmdYSRbJAZ5RP/5uZxqunbAbOXb+fiaVd0rb4JB1MZBWunCvpZkt+NJ7DVSfJpyR4qLRb/6PrR4F7qA9x0L2dmYp4t8RBd3ccLh3pYAAAA=',
  },
  'e1-feature': {
    src: '/assets/e1-feature.webp',
    width: 1200,
    height: 1500,
    alt: 'Freight trucks travel through a freeway interchange near port cranes at golden hour.',
    blurDataURL:
      'data:image/webp;base64,UklGRoAAAABXRUJQVlA4IHQAAADwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JQBadBEE0ZNvqJRQNF92GAP6uzZ+wLy2vsy3HNPEyDXDboajhMhgzR6ma719Uw4CAA80g3LRZDVRkvLaTelQYoMEsjpKXDW/zK4LTsd++SfLLcklt/K/PbqAAAA==',
  },
  'm1-port': {
    src: '/assets/m1-port.webp',
    width: 1200,
    height: 1200,
    alt: 'A port crane lowers an intermodal container onto a waiting chassis.',
    blurDataURL:
      'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABwAgCdASoQABAAA4BaJZQAFEB7dXFqLgk6JbkAAP6B9JYT7nW6aLaJZ2MoRH1SMXShlPyrTg7rWvcDfIOXXB7mHVW90ioItgWJIbLe51M1bf39bEtQ72ZbrC3V2SMe+waIlapmvWU83Q8CPGUqHAAA',
  },
  'm2-receive': {
    src: '/assets/m2-receive.webp',
    width: 1200,
    height: 1200,
    alt: 'A receiving worker photographs palletized cargo at an open container door.',
    blurDataURL:
      'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABQAgCdASoQABAAA4BaJZQCsAYxPlWLRMi4bMAA/cajLNIdr5rv3Jyayh2pyXZXOSpogl+fEILqb/VoM62Z8EtGMfJFgIGC6H9KmqKdP4beFBXqf11v3F9JYw/J593lP0941MrN/PSsKRHIHadOFEAA',
  },
  'm3-pick': {
    src: '/assets/m3-pick.webp',
    width: 1200,
    height: 1200,
    alt: 'Gloved hands retrieve a carton from a pick-to-light warehouse rack.',
    blurDataURL:
      'data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABwAgCdASoQABAAA4BaJQBOgMXr1QfPO8/A/MIAAP7tCM8gpa/DglSRlFpft9jfZpupjWX/F1D4jr1LWZiK5V6jd7FeC7rctjIlFV9Qw0uOX/IZPXQn2TFUxP2k31HFOwtjHUgs5eUi1uXYAAA=',
  },
  'm4-ship': {
    src: '/assets/m4-ship.webp',
    width: 1200,
    height: 1200,
    alt: 'Two workers close the doors of a trailer loaded with palletized freight and fit a seal.',
    blurDataURL:
      'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwAgCdASoQABAAA4BaJZQCdAYwnqtigeGAgAD+yRgRO/0tkW+XKFsd2HG2J0925N47rRBZ8O3rkSrP4OdLPrKwsA2seJNPFTZK5+KM0kd5m7r4qLbVCWN0rm9+2InMZoBRysA6k7GKAAAA',
  },
  'w1-wide': {
    src: '/assets/w1-wide.webp',
    width: 1600,
    height: 1000,
    alt: 'A wide warehouse floor connects pallet storage, staging areas and loading docks.',
    blurDataURL:
      'data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADwAQCdASoQAAoAA4BaJZQCdAEXfUnbYkAA/r/FfYT7RNykS7iJzJMCuYK0bUbIShQAUgapD2FwqfWef/yhMXmCtt53kpG3AaZAAA==',
  },
  og: {
    src: '/assets/og.webp',
    width: 1200,
    height: 630,
    alt: 'A trailer parked at a dark loading dock under a single gold light.',
    blurDataURL:
      'data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACQAQCdASoQAAgAA4BaJYwAAuP22UwA/vhOZ0/SUbdIPmmw3ImNTwuyl4RMG8rlYrdrJ0IkAAA=',
  },
}
