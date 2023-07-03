import { Children, memo } from 'react';
import { Typography } from '@/shared/Typography';
import { ControlLabelProps } from './types';

const { Label } = Typography;

export const ControlLabel = memo(function ControlLabel({ children }: ControlLabelProps) {
  return <>{Children.count(children) ? <Label className="mb-1">{children}</Label> : undefined}</>;
});
