import styles from './styles.module.scss';
import { ChangeEvent, DragEvent, memo, useRef, useState } from 'react';
import { InputFileProps } from './types';
import classnames from 'classnames';
import { IconPark } from '@/shared/IconPark';
import { Typography } from '@/shared/Typography';
import { Restrictions } from './Restrictions';

const { Text } = Typography;

export const InputFile = memo(function InputFile({ multiple, isProcessing, descriptive, onAdd, className, ...rest }: InputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleManualAttach = (e: ChangeEvent<HTMLInputElement>) => {
    emitIfAttached(e.target.files);
    inputRef.current!.value = '';
  };

  const onDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    emitIfAttached(e.dataTransfer.files);
  };

  const emitIfAttached = (fileList: FileList | null) => {
    if (!fileList?.length) {
      return;
    }

    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList.item(i) as File);
    }

    onAdd(multiple ? files : [files[0]]);
  };

  return (
    <>
      <button
        {...rest}
        type="button"
        className={classnames(
          'relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-xl text-orange transition focus:outline-0 focus:ring focus:ring-orange-700/30',
          styles.root,
          isHighlighted ? 'bg-orange/10' : '',
          className,
        )}
        disabled={isProcessing}
        onClick={() => inputRef.current!.click()}
        onDragOver={e => e.preventDefault()}
        onDragEnter={() => setIsHighlighted(true)}
        onDragLeave={() => setIsHighlighted(false)}
        onDrop={onDrop}
      >
        {isProcessing ? (
          <Spinner />
        ) : (
          <>
            <IconPark
              type="Plus"
              className="pointer-events-none text-4xl"
            />

            {descriptive && (
              <Text
                color="current"
                size="sm"
                className="pointer-events-none mt-3"
              >
                Drag-and-drop image or <br />
                select from the computer
              </Text>
            )}

            <Restrictions className="absolute right-2 top-2" />
          </>
        )}
      </button>

      <input
        ref={inputRef}
        hidden
        type="file"
        multiple={multiple}
        accept="image/*"
        onChange={handleManualAttach}
      />
    </>
  );
});

function Spinner() {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-3xl">
      <IconPark
        type="Loading"
        spin
      />
    </div>
  );
}
