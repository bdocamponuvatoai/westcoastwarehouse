import { Legal } from '@/components/sections/Legal'
import { PageIntro } from '@/components/sections/PageIntro'
import { legalUpdated, privacy } from '@/content/legal'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Westcoast Warehousing & Trucking handles information sent through this website.',
  path: '/privacy',
  noindex: true,
})

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Privacy', href: '/privacy' },
        ]}
        eyebrow="Legal"
        title="Privacy"
        accent="policy."
      />
      <Legal sections={privacy} updated={legalUpdated} />
    </>
  )
}
