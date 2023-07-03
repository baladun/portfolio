import { PageLayout } from '@/components/PageLayout';
import { Typography } from '@/shared/Typography';
import { Cover } from '@/components/Cover';
import { CategoryAdd } from '@/components/CategoryAdd';
import { getCategories } from '@/api';

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
        />
      ))}
      <CategoryAdd />
    </PageLayout>
  );
}
