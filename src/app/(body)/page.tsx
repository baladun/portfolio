import { getShowcase } from '@/api';
import { PageLayout } from '@/components/PageLayout';
import { Cover } from '@/components/Cover';
import { Typography } from '@/shared/Typography';
import { ShowcaseAdd } from '@/components/ShowcaseAdd';
import { ShowcaseMove } from '@/components/ShowcaseMove';
import { ShowcaseDelete } from '@/components/ShowcaseDelete';
import { Editable } from '@/components/Editable';

const { Heading, Text } = Typography;

export default async function Home() {
  const albums = await getShowcase();

  return (
    <PageLayout
      heading={
        <Heading className="min-h-[2.25rem]">
          <Editable>
            <ShowcaseAdd className="align-top" />
            {albums?.length > 1 ? (
              <ShowcaseMove
                albums={albums}
                className="ml-3 align-top"
              />
            ) : null}
          </Editable>
        </Heading>
      }
      className="bg-transparent !py-0"
    >
      {albums.map(el => (
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

      {!albums?.length ? <Text>No albums</Text> : null}
    </PageLayout>
  );
}
