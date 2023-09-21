import { Typography } from '@/shared/Typography';
import { PageLayoutStatic } from '@/components/PageLayoutStatic';

const { Heading, NavLinkExternal } = Typography;

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
          Contacts
        </Heading>
      }
    >
      <div>
        <div className="mb-4">
          <NavLinkExternal
            href="mailto:maxfadeev@gmail.com"
            color="snow"
          >
            maxfadeev@gmail.com
          </NavLinkExternal>
        </div>

        <div className="mb-20">
          <NavLinkExternal
            href="tel:375291234546"
            color="snow"
          >
            +44 514 782 278
          </NavLinkExternal>
        </div>

        <Heading
          level={5}
          kind="secondary"
          color="snow"
          className="mb-[0.875rem] leading-9 sm:mb-6 xl:mb-10"
        >
          Socials
        </Heading>

        <div className="mb-4">
          <NavLinkExternal
            href="https://instagram.com/fadeev_maxim"
            target="_blank"
            color="snow"
          >
            instagram.com/fadeev_maxim
          </NavLinkExternal>
        </div>

        <div className="mb-4">
          <NavLinkExternal
            href="https://facebook.com/max.fadeev"
            target="_blank"
            color="snow"
          >
            facebook.com/max.fadeev
          </NavLinkExternal>
        </div>

        <div className="mb-4">
          <NavLinkExternal
            href="https://vk.com/max_bezdomniy"
            target="_blank"
            color="snow"
          >
            vk.com/max_bezdomniy
          </NavLinkExternal>
        </div>
      </div>
    </PageLayoutStatic>
  );
}
