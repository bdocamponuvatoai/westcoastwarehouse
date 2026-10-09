import { CtaBlock } from '@/components/sections/CtaBlock'
import { Faq } from '@/components/sections/Faq'
import { Inquiry } from '@/components/sections/Inquiry'
import { Method } from '@/components/sections/Method'
import { PageIntro } from '@/components/sections/PageIntro'
import { JsonLd, howTo, webPage } from '@/components/seo/JsonLd'
import { process as steps } from '@/content/process'
import { processPage } from '@/content/site'
import { pageMetadata } from '@/lib/seo'

const description =
  'From container drayage at the port to storage, pick and pack, and delivery across all 48 states.'

export const metadata = pageMetadata({ title: 'Process', description, path: '/process' })

export default function ProcessPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Process', href: '/process' },
        ]}
        eyebrow={processPage.eyebrow}
        title={processPage.title}
        accent={processPage.accent}
        lead={processPage.lead}
        image="e1-feature"
        variant="editorial"
        focus="50% 40%"
        chips={steps.map((s) => s.title)}
      />
      <Method intro={false} showDetail tone="light" />
      <CtaBlock />
      <Faq />
      <Inquiry />
      <JsonLd data={[webPage('WebPage', '/process', 'Process', description), howTo()]} />
    </>
  )
}
