# Photography prompts

Every photo frame on the site currently shows a designed placeholder (slate panel, fine gold
hatch, line icon). Generate or shoot the images below, then for each one:

1. Save the original as `assets-src/<key>.original.png`.
2. Retouch out any stray text, logos or plates and save as `assets-src/<key>.png`.
3. Run `npm run media -- photo <key>` and paste the printed entry into `content/assets.ts`.
4. Replace `alt` with a sentence describing what is actually in the photo.

Real photos of the Compton facility, fleet and team beat generated images. If you use real
photos, keep faces anonymous or get releases, and crop to the ratios below.

## Style guide (paste first into the image model)

```
You are art-directing a photo series for "Westcoast Warehousing & Trucking", a third-party
warehousing, drayage and e-commerce fulfillment company in Compton, California, near the Ports
of Los Angeles and Long Beach. The website uses matte slate-black (#0E1215), warm off-white
(#F3F1EC) and one accent, signal gold (#F6B73C). Every image in this chat must follow these rules:

LOOK: Real documentary photography of a working Southern California warehouse, container yard
and truck fleet. Candid, mid-action, never posed. 35mm full-frame, 35 or 50mm lens, f/2.8–f/4.
Natural daylight or one direct flash. True-to-life colour, slightly muted, fine film grain.
Lived-in details: scuffed concrete, pallet wrap, dock bumpers, chassis rust.

PALETTE: Mostly neutral. Exactly ONE small signal-gold object in every frame (a hard hat, a
safety vest stripe, a forklift mast, a dock light). No other saturated colours.

PEOPLE: Diverse adults in simple workwear, always anonymous (from behind, cropped, hands, faces
turned away or out of focus). Natural skin texture.

STRICTLY AVOID: readable text, letters, numbers, logos, brand names, container company names,
licence plates, watermarks; teal-orange grading; rim light or glows; lens flares; HDR; plastic
skin; floating objects; neon; sci-fi; stock smiles or handshakes.

OUTPUT: Photorealistic, no borders or captions. Leave negative space where asked. Reply "Ready".
```

## Shot list

| Key              | Where it shows                    | Ratio  | Prompt                                                                                                                                         |
| ---------------- | --------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `h1-desktop`     | Home hero (desktop)               | 16:9   | Dusk at a container yard: a tractor pulling a 40′ container on a chassis toward camera, low angle. Left 55% darker and calm for headline text. |
| `h1-mobile`      | Home hero (phones)                | 3:4    | Same scene, vertical: tractor and container in the lower half, sky and gantry cranes above, top 60% quiet for text.                            |
| `s1-warehousing` | Warehousing row, panel, page      | 4:3    | High-bay racking aisle, a reach truck lifting a shrink-wrapped pallet, operator seen from behind.                                              |
| `s2-trucking`    | Trucking row, panel, page         | 4:3    | Side view of a tractor-trailer backing into a dock door, driver's arm out of the window, morning light.                                        |
| `s3-e-commerce`  | E-commerce row, panel, page       | 4:3    | Packing bench: hands sealing a small parcel next to a scanner and a stack of mailers.                                                          |
| `e1-feature`     | Location feature, About           | 4:5    | Freeway interchange near the port at golden hour, trucks in motion, cranes on the horizon.                                                     |
| `m1-port`        | Process step 1                    | 1:1    | Gantry crane lowering a container onto a chassis, seen from ground level.                                                                      |
| `m2-receive`     | Process step 2                    | 1:1    | Worker photographing incoming cargo at an open container door with a handheld device.                                                          |
| `m3-pick`        | Process step 3                    | 1:1    | Pick-to-light rack: a lit gold indicator, a gloved hand reaching for a carton.                                                                 |
| `m4-ship`        | Process step 4                    | 1:1    | Trailer doors closing on a full load of palletised freight, seal being applied.                                                                |
| `w1-wide`        | "One roof" section                | 16:10  | Wide interior of the whole warehouse floor: racking, dock doors and a forklift, natural skylight.                                              |
| `og`             | Share image background (optional) | 1.91:1 | Dark loading dock at night, single gold dock light on the right, left two-thirds empty.                                                        |

Every frame on the site uses its photo's native ratio, so crop each image to exactly the ratio
listed.
