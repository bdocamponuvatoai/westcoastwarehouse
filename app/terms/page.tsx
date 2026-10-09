import { Legal } from '@/components/sections/Legal'
import { PageIntro } from '@/components/sections/PageIntro'
import { legalUpdated, terms } from '@/content/legal'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'The terms that apply to using the Westcoast Warehousing & Trucking website.',
  path: '/terms',
  noindex: true,
})

export default function TermsPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Terms', href: '/terms' },
        ]}
        eyebrow="Legal"
        title="Terms of"
        accent="use."
      />
      <Legal sections={terms} updated={legalUpdated} />
    </>
  )
}
