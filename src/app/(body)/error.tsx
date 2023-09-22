'use client';

import { Typography } from '@/shared/Typography';
import { ErrorRouteProps } from '@/types';
import { Button } from '@/shared/Button';

const { Heading, Text } = Typography;

export default function Error({ reset }: ErrorRouteProps) {
  return (
    <div className="flex justify-center h-full flex-col items-center positioner">
      <Heading
        level={4}
        kind="secondary"
        color="brown"
        className="mb-10"
      >
        Internal Error
      </Heading>

      <Text className="text-black-200 mb-5">We apologize for the inconvenience, but something went wrong on our end.</Text>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
