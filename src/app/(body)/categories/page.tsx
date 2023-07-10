import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { Cover } from '@/components/Cover';
import { CategoryAdd } from '@/components/CategoryAdd';
import { getCategories } from '@/api';
import { CategoryMove } from '@/components/CategoryMove';
import { CategoryDelete } from '@/components/CategoryDelete';
import { CategoryEdit } from '@/components/CategoryEdit';

const { Heading, Text } = Typography;

export default async function Page() {
  const categories = await getCategories();

  return (
    <PageLayout
      heading={
        <Heading
          level={5}
          kind="secondary"
          color="snow"
        >
          categorIes / <wbr /> <span>alex andr</span>
          <CategoryMove
            categories={categories}
            className="ml-2 align-top"
          />
        </Heading>
      }
    >
      {categories.map(el => (
        <Cover
          key={el.id}
          image={el.coverImage}
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
            <>
              <CategoryEdit category={el} />
              <CategoryDelete category={el} />
            </>
          }
        />
      ))}
      <CategoryAdd />
    </PageLayout>
  );
}
