import { ActionsProps } from './types';
import { Button } from '@/shared/Button';
import { IconPark } from '@/shared/IconPark';
import { modeActionsConfig, rotationActionsConfig } from './utils';
import { useMemo } from 'react';

export function Actions({ mode, rotation, width, height, onModeChange, onRotationChange }: ActionsProps) {
  const sizes = useMemo(() => `${width}\x20x\x20${height}`, [width, height]);

  return (
    <div className="relative mb-1 flex justify-center">
      <div className="button-group-horizontal">
        {modeActionsConfig.map((conf, idx) => (
          <Button
            key={idx}
            kind={mode === conf.type ? 'filled' : 'text'}
            size="xs"
            className="min-w-[3.25rem]"
            onClick={() => onModeChange(conf.type)}
          >
            {conf.text}
          </Button>
        ))}
      </div>

      {mode === 'edit' && (
        <div className="absolute right-0 flex gap-2">
          <div className="flex items-center gap-1 text-xs text-black-200">
            <IconPark
              type="Tailoring"
              className="text-black-400"
            />
            <span className="min-w-[4.5rem]">{sizes}</span>
            <IconPark
              type="RotateOne"
              className="text-black-400"
            />
            <span className="min-w-[3.75rem]">{rotation}deg</span>
          </div>

          <div className="button-group-horizontal">
            {rotationActionsConfig.map((conf, idx) => (
              <Button
                key={idx}
                kind="text"
                size="xs"
                icon={
                  <IconPark
                    type="Rotate"
                    style={conf.styles}
                  />
                }
                onClick={() => onRotationChange(conf.delta)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
