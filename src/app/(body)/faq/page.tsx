import { Typography } from '@/shared/Typography';
import { PageLayoutStatic } from '@/components/PageLayoutStatic';
import { AccordionItemWrapped, AccordionWrapped } from './AccordionWrapped';
import { faqConfig } from './config';

const { Heading } = Typography;

export const revalidate = 86_400;
export default function Page() {
  return (
    <PageLayoutStatic
      backHref="/"
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          FAQ
        </Heading>
      }
    >
      <AccordionWrapped className="md:max-w-3xl">
        {faqConfig.map((conf, idx) => (
          <AccordionItemWrapped
            key={idx}
            header={conf.header}
          >
            {conf.content}
          </AccordionItemWrapped>
        ))}
      </AccordionWrapped>
    </PageLayoutStatic>
  );
}
