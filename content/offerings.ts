import type { AssetKey } from './assets'

export const capabilities = [
  // Warehousing
  'Pick to Light',
  'Automated Shipping and Sorting',
  'Storage',
  'Palletizing',
  'Quality Control',
  'Retail Compliant Barcoding and Labeling',
  'Ticketing',
  'Inventory Management',
  'Kitting',
  'Shrink Wrapping',
  'Floor Ready',
  'Customer Service Management',
  'Customer Portal',
  'Cross-Dock',
  // Trucking
  'Container Drayage — San Pedro, LA, Oakland',
  'Local Delivery',
  'Less than Truckload',
  'Full Trailer Load',
  'Long Haul — licensed in all 48 states',
  'Overweight Drayage',
  '53’ Dry Vans',
  '20’ and 40’ Tri-Axles',
  'Super Chassis — 39,000–46,000 lbs',
  'Airline Pick-Ups',
  'Bonded Trucking',
  'Truckload and LTL Air and Ocean',
  'Yard Storage for Containers',
  // E-commerce
  'EDI',
  'Multi-Channel Integration',
  'Pick and Pack',
  'Drop-Shipment',
  'Special Handling',
] as const

export type Capability = (typeof capabilities)[number]

export type Offering = {
  id: 'warehousing' | 'trucking' | 'e-commerce'
  index: string
  name: string
  short: string
  headline: string
  promise: string
  body: string[]
  capabilities: Capability[]
  connection: string
  image: AssetKey
  questions: string
  apply?: { label: string }
}

export const offerings: Offering[] = [
  {
    id: 'warehousing',
    index: '01',
    name: 'Warehousing',
    short: 'Storage, fulfillment and retail compliance',
    headline: 'Quality warehousing at the most competitive rates.',
    promise:
      'We provide warehousing solutions customized on the specific needs and business requirements of our clients.',
    body: [
      'At Westcoast Warehousing & Trucking, we offer warehousing solutions customized on the specific needs and business requirements of our clients. Whether you need short-term storage, integrated long-term warehousing solutions, or if you need a cross-dock terminal, we are ready to accommodate your needs.',
    ],
    capabilities: [
      'Pick to Light',
      'Automated Shipping and Sorting',
      'Storage',
      'Cross-Dock',
      'Palletizing',
      'Quality Control',
      'Retail Compliant Barcoding and Labeling',
      'Ticketing',
      'Inventory Management',
      'Kitting',
      'Shrink Wrapping',
      'Floor Ready',
      'Customer Service Management',
      'Customer Portal',
    ],
    connection:
      'Short-term storage, long-term warehousing or a cross-dock terminal — the hand-off point between the port and the road.',
    image: 's1-warehousing',
    questions:
      'Our experts are ready to help. Contact us at 310-635-9938 for assistance. For a more detailed discussion of your warehousing needs, you can set an appointment now.',
    apply: { label: 'Apply Now (Job Application)' },
  },
  {
    id: 'trucking',
    index: '02',
    name: 'Trucking',
    short: 'Drayage, LTL, full load and long haul',
    headline: 'We care about your load.',
    promise:
      'We have extensive experience in transporting goods from manufacturers in a broad range of industries.',
    body: [
      'At Westcoast Warehousing & Trucking, we have extensive experience with port drayage, export, imports, over the road, and other transportation needs. With our fleet of tractors, trailers, bobtails and port chassis, we can transport a variety of freight. Our team handles a quick response time, with safety always in mind.',
      'Our intermodal services and container drayage allows us to provide services to and from every major West Coast port. Container drayage is provided for overweight, oversized crates, reefers, dry containers, flat racks, and cross-docking.',
    ],
    capabilities: [
      'Container Drayage — San Pedro, LA, Oakland',
      'Local Delivery',
      'Less than Truckload',
      'Full Trailer Load',
      'Long Haul — licensed in all 48 states',
      'Overweight Drayage',
      '53’ Dry Vans',
      '20’ and 40’ Tri-Axles',
      'Super Chassis — 39,000–46,000 lbs',
      'Airline Pick-Ups',
      'Bonded Trucking',
      'Truckload and LTL Air and Ocean',
      'Yard Storage for Containers',
    ],
    connection:
      'Tractors, trailers, bobtails and port chassis that pick up at the port and deliver across all 48 states.',
    image: 's2-trucking',
    questions:
      'Set an appointment now and experience the convenience and affordability that only we can deliver. If you have other questions, give us a call at 310-635-9938.',
    apply: { label: 'Apply Now (Driver Application)' },
  },
  {
    id: 'e-commerce',
    index: '03',
    name: 'E-commerce',
    short: 'Multi-channel order fulfillment',
    headline: 'All components for e-commerce fulfillment.',
    promise: 'We are dedicated for a fast turnaround whatever your e-commerce needs.',
    body: [
      'Westcoast Warehousing & Trucking offers all components for e-commerce fulfillment. We are dedicated for a fast turnaround whatever your e-commerce needs.',
      'Our integration with online platforms, like Shopify, WooCommerce, eBay, Etsy, etc. makes it easy to fulfill orders through multiple online channels for order processing for the customer. With our integration, order processing is seamless and efficient, which allows quick shipment for the customer. This includes inventory management, pick and pack, drop-shipment, and other special handling requirements.',
    ],
    capabilities: [
      'Multi-Channel Integration',
      'Inventory Management',
      'Pick and Pack',
      'Drop-Shipment',
      'Special Handling',
      'EDI',
    ],
    connection:
      'Orders from multiple online channels, picked, packed and shipped from the same building that stores your inventory.',
    image: 's3-e-commerce',
    questions:
      'Our experts are ready to help. Contact us at 310-635-9938 for assistance, or set an appointment through our online portal.',
  },
]

export const getOffering = (id: string) => offerings.find((o) => o.id === id)

export const technologies = [
  'Digital Pictures of Incoming Cargo',
  'Customer Portal Inventory',
  'FTP',
  'Retail Compliant Bar Coding',
  'Real-Time Information on your Cargo Status',
  'Electronic Proof of Delivery',
  'Conveyor and Sorting',
  'GPS Tracking',
] as const

export type Technology = (typeof technologies)[number]
