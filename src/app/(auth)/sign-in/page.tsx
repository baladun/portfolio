import { SignIn } from '@/components/SignIn';
import { Typography } from '@/shared/Typography';

const { Heading } = Typography;

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Heading level={5}>Sign In</Heading>
      <SignIn className="w-80" />
    </div>
  );
}
