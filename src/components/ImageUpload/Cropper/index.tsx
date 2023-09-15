import styles from './styles.module.scss';
import { memo, useState } from 'react';
import { CropperMode, CropperProps } from './types';
import { ReactCrop } from 'react-image-crop';
import classnames from 'classnames';
import { Actions } from './Actions';
import { ViewMode } from './ViewMode';
import { cropperAreaHeightREM, cropperAreaWidthREM } from '../utils';

export const Cropper = memo(function Cropper({ attachment, onChange }: CropperProps) {
  const {
    raw: { dataUrl },
    modification: { crop, aspect, rotation, minWidth, minHeight },
    result,
  } = attachment;
  const [mode, setMode] = useState<CropperMode>('view');

  return (
    <>
      <Actions
        mode={mode}
        rotation={rotation}
        width={result.width}
        height={result.height}
        onModeChange={setMode}
        onRotationChange={delta => onChange({ rotation: rotation + delta })}
      />

      <div
        className="flex select-none items-center justify-center rounded-lg bg-black-50"
        style={{ width: `${cropperAreaWidthREM}rem`, height: `${cropperAreaHeightREM}rem` }}
      >
        {mode === 'edit' ? (
          <ReactCrop
            crop={crop}
            aspect={aspect}
            keepSelection
            ruleOfThirds
            minWidth={minWidth}
            minHeight={minHeight}
            onChange={(_, crop) => onChange({ crop })}
            className={classnames('max-h-[32rem] max-w-2xl', styles.cropper)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Crop me"
              src={dataUrl}
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </ReactCrop>
        ) : (
          <ViewMode result={result} />
        )}
      </div>
    </>
  );
});
