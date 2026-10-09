import { Faq } from '@/components/sections/Faq'
import { Feature } from '@/components/sections/Feature'
import { Hero } from '@/components/sections/Hero'
import { Inquiry } from '@/components/sections/Inquiry'
import { Method } from '@/components/sections/Method'
import { OneRoof } from '@/components/sections/OneRoof'
import { Panels } from '@/components/sections/Panels'
import { Problem } from '@/components/sections/Problem'
import { ServicesShowcase } from '@/components/sections/ServicesShowcase'
import { JsonLd, howTo, webPage } from '@/components/seo/JsonLd'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ description: site.description, path: '/' })

export default function HomePage() {
  return (
    <>
      <Hero />
      <Panels />
      <Problem />
      <OneRoof />
      <ServicesShowcase />
      <Method />
      <Feature />
      <Faq />
      <Inquiry />
      <JsonLd data={[webPage('WebPage', '/', site.name, site.description), howTo()]} />
    </>
  )
}
