import {
  Anchor,
  ArrowLeftRight,
  Barcode,
  BadgeCheck,
  Boxes,
  Camera,
  ClipboardList,
  Combine,
  Container,
  Database,
  FileCheck2,
  FolderUp,
  Forklift,
  Gauge,
  Headset,
  Layers,
  Lightbulb,
  MapPin,
  MonitorSmartphone,
  Navigation,
  Network,
  Package,
  PackageCheck,
  PackageOpen,
  Plane,
  Radio,
  Route,
  ScanBarcode,
  Send,
  Shield,
  ShieldCheck,
  Ship,
  Shrink,
  Split,
  Store,
  Tag,
  Truck,
  Warehouse,
  Weight,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import type { Capability, Technology } from '@/content/offerings'
import { cx } from './ui'

const capabilityIcons: Record<Capability, LucideIcon> = {
  'Pick to Light': Lightbulb,
  'Automated Shipping and Sorting': Split,
  Storage: Warehouse,
  Palletizing: Layers,
  'Quality Control': ShieldCheck,
  'Retail Compliant Barcoding and Labeling': Barcode,
  Ticketing: Tag,
  'Inventory Management': ClipboardList,
  Kitting: Combine,
  'Shrink Wrapping': Shrink,
  'Floor Ready': Store,
  'Customer Service Management': Headset,
  'Customer Portal': MonitorSmartphone,
  'Cross-Dock': ArrowLeftRight,
  'Container Drayage — San Pedro, LA, Oakland': Container,
  'Local Delivery': MapPin,
  'Less than Truckload': Package,
  'Full Trailer Load': Truck,
  'Long Haul — licensed in all 48 states': Route,
  'Overweight Drayage': Weight,
  '53’ Dry Vans': Truck,
  '20’ and 40’ Tri-Axles': Forklift,
  'Super Chassis — 39,000–46,000 lbs': Gauge,
  'Airline Pick-Ups': Plane,
  'Bonded Trucking': Shield,
  'Truckload and LTL Air and Ocean': Ship,
  'Yard Storage for Containers': Boxes,
  EDI: Network,
  'Multi-Channel Integration': Workflow,
  'Pick and Pack': PackageOpen,
  'Drop-Shipment': Send,
  'Special Handling': BadgeCheck,
}

const technologyIcons: Record<Technology, LucideIcon> = {
  'Digital Pictures of Incoming Cargo': Camera,
  'Customer Portal Inventory': Database,
  FTP: FolderUp,
  'Retail Compliant Bar Coding': ScanBarcode,
  'Real-Time Information on your Cargo Status': Radio,
  'Electronic Proof of Delivery': FileCheck2,
  'Conveyor and Sorting': Split,
  'GPS Tracking': Navigation,
}

// Named glyphs used by content files (problem beats, feature points).
export const namedIcons = {
  warehouse: Warehouse,
  route: Route,
  gauge: Gauge,
  'map-pin': MapPin,
  ship: Ship,
  container: Container,
  anchor: Anchor,
  truck: Truck,
  package: PackageCheck,
} satisfies Record<string, LucideIcon>

export type NamedIcon = keyof typeof namedIcons

export function IconRing({
  icon: Icon,
  small = false,
  className,
}: {
  icon: LucideIcon
  small?: boolean
  className?: string
}) {
  return (
    <span
      className={cx('icon-ring draw-on', small && 'icon-ring-sm', className)}
      aria-hidden="true"
    >
      <Icon strokeWidth={1.5} />
    </span>
  )
}

export function CapabilityIcon({ name, small }: { name: Capability; small?: boolean }) {
  return <IconRing icon={capabilityIcons[name]} small={small} />
}

export function TechnologyIcon({ name, small }: { name: Technology; small?: boolean }) {
  return <IconRing icon={technologyIcons[name]} small={small} />
}
