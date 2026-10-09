import { Convenience } from '@/components/sections/Convenience'
import { Faq } from '@/components/sections/Faq'
import { Inquiry } from '@/components/sections/Inquiry'
import { JsonLd, breadcrumbs, webPage } from '@/components/seo/JsonLd'
import { rateEstimatePage } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

const description =
  'Request a complimentary transportation and warehousing estimate from Westcoast Warehousing & Trucking.'

export const metadata = pageMetadata({
  title: 'Rate Estimate',
  description,
  path: '/rate-estimate',
})

export default function RateEstimatePage() {
  return (
    <>
      <div className="pt-12 sm:pt-16">
        <Inquiry asPageHeading />
      </div>
      <Faq />
      <Convenience />
      <JsonLd
        data={[
          webPage('ContactPage', '/rate-estimate', rateEstimatePage.eyebrow, description),
          breadcrumbs([
            { name: 'Home', href: '/' },
            { name: 'Rate Estimate', href: '/rate-estimate' },
          ]),
        ]}
      />
    </>
  )
}
