import { memo, useEffect, useState } from 'react';
import { ViewModeProps } from './types';

export const ViewMode = memo(function ViewMode({ result }: ViewModeProps) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    setTimeout(() => setUrl(URL.createObjectURL(result.blob)), 200);

    return () => {
      url && URL.revokeObjectURL(url);
    };
  }, [result]);

  return (
    <>
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="View result"
          className="max-h-full"
        />
      )}
    </>
  );
});
