import { faq } from '@/content/faq'
import { offerings, technologies } from '@/content/offerings'
import { process } from '@/content/process'
import { about, site } from '@/content/site'
import { absolute } from '@/lib/seo'

export const dynamic = 'force-static'

export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    about.story.join('\n\n'),
    '',
    '## Contact',
    `- Address: ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
    `- Phone: ${site.phone}`,
    `- Fax: ${site.fax}`,
    `- Email: ${site.email}`,
    `- Rate estimate: ${absolute('/rate-estimate')}`,
    `- Customer portal: ${site.portal.href}`,
    '',
    '## Services',
    ...offerings.flatMap((o) => [
      `### [${o.name}](${absolute(`/services/${o.id}`)})`,
      o.promise,
      ...o.capabilities.map((c) => `- ${c}`),
      '',
    ]),
    '## Technologies',
    ...technologies.map((t) => `- ${t}`),
    '',
    '## Process',
    ...process.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`),
    '',
    '## FAQ',
    ...faq.flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Pages',
    `- [About](${absolute('/about')})`,
    `- [Services](${absolute('/services')})`,
    `- [Process](${absolute('/process')})`,
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
