import { PageLayout } from '@/components/PageLayout';
import { Cover } from '@/components/Cover';
import { Typography } from '@/shared/Typography';
import { ShowcaseAdd } from '@/components/ShowcaseAdd';
import { ShowcaseMove } from '@/components/ShowcaseMove';
import { ShowcaseDelete } from '@/components/ShowcaseDelete';
import { Editable } from '@/components/Editable';
import { Metadata } from 'next';
import { getSsrShowcase } from './ssr';
import { ssrResponseHasError } from '@/types';
import { notFound } from 'next/navigation';

const { Heading, Text } = Typography;

export const revalidate = 86_400;
export const metadata: Metadata = {
  title: 'Photographer Warsaw, wedding, lifestyle, new born, family',
};

export default async function Home() {
  const albumsRes = await getSsrShowcase();

  if (ssrResponseHasError(albumsRes)) {
    return notFound();
  }

  return (
    <PageLayout
      heading={
        <Heading className="min-h-[2.25rem]">
          <Editable>
            <ShowcaseAdd className="align-top" />
            {albumsRes?.length > 1 ? (
              <ShowcaseMove
                albums={albumsRes}
                className="ml-3 align-top"
              />
            ) : null}
          </Editable>
        </Heading>
      }
      className="bg-transparent !py-0"
    >
      {albumsRes.map(el => (
        <Cover
          key={el.id}
          image={el.coverImage}
          href={{
            pathname: `/albums/${el.id}`,
          }}
          subtitle={
            <Text
              size="sm"
              className="block text-center"
            >
              {el.name}
            </Text>
          }
          actions={
            <Editable>
              <ShowcaseDelete album={el} />
            </Editable>
          }
        />
      ))}

      {!albumsRes?.length ? <Text>No albums</Text> : null}
    </PageLayout>
  );
}
