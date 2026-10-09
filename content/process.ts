import type { AssetKey } from './assets'

export type Step = {
  index: string
  title: string
  body: string
  detail: string
  image: AssetKey
}

// Steps follow the distribution process described on the About page:
// "From picking up your product at the port to shipping your product across the United States".
export const process: Step[] = [
  {
    index: '01',
    title: 'Pick up at the port',
    body: 'Container drayage to and from every major West Coast port, including San Pedro, Los Angeles and Oakland.',
    detail:
      'Overweight, oversized crates, reefers, dry containers and flat racks, with super chassis for 39,000–46,000 lb loads.',
    image: 'm1-port',
  },
  {
    index: '02',
    title: 'Receive and store',
    body: 'Short-term storage, integrated long-term warehousing or a cross-dock terminal — ten miles from the ports.',
    detail:
      'Digital pictures of incoming cargo and customer portal inventory, so you know what arrived the moment it does.',
    image: 'm2-receive',
  },
  {
    index: '03',
    title: 'Pick, pack and comply',
    body: 'Pick to light, kitting, ticketing and retail compliant barcoding and labeling, ready for the shelf.',
    detail:
      'Quality control, palletizing, shrink wrapping and floor-ready preparation before anything ships.',
    image: 'm3-pick',
  },
  {
    index: '04',
    title: 'Ship across the country',
    body: 'Local delivery, less than truckload, full trailer load and long haul trucking, licensed in all 48 states.',
    detail: 'GPS tracking, real-time cargo status and electronic proof of delivery on every load.',
    image: 'm4-ship',
  },
]
