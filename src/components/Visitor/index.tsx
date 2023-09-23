'use client';

import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect } from 'react';
import { upsertVisitor } from '@/api-client';

export function Visitor() {
  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();

      const {
        visitorId,
        components: { timezone },
      } = await fp.get();

      try {
        await upsertVisitor({
          id: visitorId,
          timezone: (timezone as any).value,
        });
      } catch (e) {}
    };

    setFp();
  }, []);

  return <></>;
}
