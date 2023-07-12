'use client';

import { Attachment, CropperChange, ImageUploadProps } from './types';
import { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Cropper } from './Cropper';
import { RawPreviews } from './RawPreviews';
import { calculateCroppedSize, modifyImage, processFiles, toAttachments } from './utils';
import { debounceTime } from '@/utils';
import { InputFile } from './InputFile';
import toast from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';
import { usePrevious } from '@/hooks';

function ErrorMessage({ text }: { text: string }) {
  return (
    <span className="break-all">
      <span className="font-bold">{text}</span> was not added
    </span>
  );
}

export const ImageUpload = memo(
  forwardRef<HTMLDivElement, ImageUploadProps>(function ImageUpload(
    {
      multiple = false, //
      shape = 'rectangle',
      preloaded,
      className,
      onUpdate,
      ...rest
    },
    ref,
  ) {
    const canvas = useMemo(() => document.createElement('canvas'), []);
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const prevAttachments = usePrevious(attachments);
    const [selectedAttachment, setSelectedAttachment] = useState<Attachment>();
    const debouncedSelectedAttachment = useDebounce(selectedAttachment, 500);
    const prevDebouncedSelectedAttachment = usePrevious(debouncedSelectedAttachment);
    const [filesInProcess, setFilesInProcess] = useState(false);

    useEffect(() => {
      if (preloaded) {
        addFiles(Array.isArray(preloaded) ? preloaded : [preloaded]);
      }
    }, [preloaded]);

    const addFiles = async (files: File[]) => {
      setFilesInProcess(true);
      const { fulfilled, skippedFileNames } = await processFiles(files);

      if (skippedFileNames.length) {
        skippedFileNames.forEach(name => toast.error(<ErrorMessage text={name} />));
      }

      if (fulfilled.length) {
        const att = await toAttachments(fulfilled, canvas, shape);
        setAttachments(attachments.concat(att));
        !selectedAttachment && setSelectedAttachment(att![0]);
      }

      setFilesInProcess(false);
    };

    const onCropperChange = ({ crop: updatedCrop, rotation: updatedRotation }: CropperChange) => {
      if (selectedAttachment) {
        if (updatedCrop != null) {
          const { naturalWidth, naturalHeight } = selectedAttachment.raw.image;

          selectedAttachment.modification.crop = updatedCrop;
          selectedAttachment.result.width = calculateCroppedSize(naturalWidth, updatedCrop.width);
          selectedAttachment.result.height = calculateCroppedSize(naturalHeight, updatedCrop.height);
        }
        if (updatedRotation != null) {
          selectedAttachment.modification.rotation = updatedRotation;
        }

        setSelectedAttachment(Object.assign({}, selectedAttachment));

        debounceTime(async () => {
          const {
            raw: { image, mime },
            modification: { crop, rotation },
          } = selectedAttachment;
          selectedAttachment.result.blob = await modifyImage({ image, canvas, crop, rotation, mime });
          setSelectedAttachment(Object.assign({}, selectedAttachment));
        }, 300);
      }
    };

    const deleteAttachment = (id: Attachment['id']) => {
      const prevIdxOfSelected = attachments!.findIndex(el => el.id === id);
      const updated = attachments!.filter(el => el.id !== id);
      setAttachments(updated);

      if (updated.length && id === selectedAttachment?.id) {
        const newIdxOfSelected = updated.length - 1 >= prevIdxOfSelected ? prevIdxOfSelected : updated.length - 1;
        setSelectedAttachment(updated[newIdxOfSelected]);
      }

      if (!updated.length) {
        setSelectedAttachment(undefined);
      }
    };

    useEffect(() => {
      if (onUpdate) {
        if (attachments.length !== (prevAttachments || []).length || debouncedSelectedAttachment != prevDebouncedSelectedAttachment) {
          const value = attachments.length ? attachments.map(att => att.result.blob) : null;
          onUpdate(value);
        }
      }
    }, [attachments, debouncedSelectedAttachment]);

    return (
      <div
        {...rest}
        ref={ref}
        className={classNames(className)}
      >
        {!attachments?.length ? (
          <InputFile
            multiple={multiple}
            isProcessing={filesInProcess}
            descriptive
            onAdd={addFiles}
          />
        ) : (
          <>
            {selectedAttachment ? (
              <>
                <Cropper
                  attachment={selectedAttachment}
                  onChange={onCropperChange}
                />
                <RawPreviews
                  attachments={attachments}
                  selectedAttachment={selectedAttachment}
                  onSelect={setSelectedAttachment}
                  onReorder={setAttachments}
                  onDelete={deleteAttachment}
                >
                  {multiple && (
                    <InputFile
                      multiple={multiple}
                      isProcessing={filesInProcess}
                      onAdd={addFiles}
                    />
                  )}
                </RawPreviews>
              </>
            ) : null}
          </>
        )}
      </div>
    );
  }),
);

export type { Attachment };
