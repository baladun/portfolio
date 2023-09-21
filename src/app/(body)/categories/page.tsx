import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { Cover } from '@/components/Cover';
import { CategoryAdd } from '@/components/CategoryAdd';
import { CategoryMove } from '@/components/CategoryMove';
import { CategoryDelete } from '@/components/CategoryDelete';
import { CategoryEdit } from '@/components/CategoryEdit';
import { Editable } from '@/components/Editable';
import { getSsrCategories } from './ssr';
import { notFound } from 'next/navigation';
import { ssrResponseHasError } from '@/types';

const { Heading, Text } = Typography;

export default async function Page() {
  const categoriesRes = await getSsrCategories();

  if (ssrResponseHasError(categoriesRes)) {
    return notFound();
  }

  return (
    <PageLayout
      backHref="/"
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          categorIes
          {categoriesRes?.length > 1 ? (
            <Editable>
              <CategoryMove
                categories={categoriesRes}
                className="ml-3 align-top"
              />
            </Editable>
          ) : null}
        </Heading>
      }
    >
      {categoriesRes.map(el => (
        <Cover
          key={el.id}
          image={el.coverImage}
          href={{
            pathname: `/categories/${el.id}`,
          }}
          subtitle={
            <Text
              color="snow"
              size="sm"
              className="block text-center"
            >
              {el.name}
            </Text>
          }
          actions={
            <Editable>
              <CategoryEdit category={el} />
              <CategoryDelete category={el} />
            </Editable>
          }
        />
      ))}
      <Editable>
        <CategoryAdd />
      </Editable>
    </PageLayout>
  );
}
