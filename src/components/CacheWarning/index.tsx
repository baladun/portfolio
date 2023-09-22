import { Editable } from '@/components/Editable';
import { IconPark } from '@/shared/IconPark';
import { Typography } from '@/shared/Typography';

const { Text } = Typography;

export function CacheWarning() {
  return (
    <Editable>
      <div className="mb-4 border border-orange text-orange rounded-lg px-4 py-2">
        <IconPark
          type="Info"
          className="mr-2"
        />

        <Text
          color="orange"
          size="sm"
        >
          If changes are not reflected it might be caused that new version of page has not built yet on server so wait few seconds and make
          hard refresh browser page so that fetch it
        </Text>
      </div>
    </Editable>
  );
}
