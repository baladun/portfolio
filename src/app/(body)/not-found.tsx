import { Typography } from '@/shared/Typography';

const { Heading, Text, NavLink } = Typography;

export default function NotFound() {
  return (
    <div className="flex justify-center h-full flex-col items-center positioner">
      <Heading
        level={4}
        kind="secondary"
        color="brown"
        className="mb-10"
      >
        Page Not Found
      </Heading>

      <Text className="text-black-200 mb-5">Oops! It looks like this page is playing hide and seek.</Text>
      <NavLink href="/">Home</NavLink>
    </div>
  );
}
