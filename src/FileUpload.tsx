import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import createBlob from "./utils/createBlob";
import destroyBlob from "./utils/destroyBlob";
import "./style.scss";
import * as types from "./types";
import imageIcon from "./image.svg";
import { nanoid } from "nanoid";

import { useRef } from "react";
import Preview from "./Preview";

type Props = {
  name: string;
  multiple?: boolean;
  shape?: types.Shape;
  size?: types.Size;
  showFileName?: boolean;
  showFileSize?: boolean;
  onChange?: (state: types.FileState | types.FilesState) => void;
};

const FileUpload = ({
  name,
  shape = "square",
  size = "medium",
  multiple = false,
  showFileName = true,
  showFileSize = true,
  onChange
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [singleFileState, setSingleFileState] = useState<types.FileState>(null);
  const [multipleFilesState, setMultipleFilesState] =
    useState<types.FilesState>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (singleFileState) {
        destroyBlob(singleFileState.preview);
      }

      setSingleFileState({
        id: nanoid(),
        preview: createBlob(file),
        value: file
      });
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      multipleFilesState.forEach((fileItem) => {
        destroyBlob(fileItem.preview);
      });

      const newFiles = Array.from(e.target.files).map((file) => ({
        id: nanoid(),
        preview: createBlob(file),
        value: file
      }));

      setMultipleFilesState([...multipleFilesState, ...newFiles]);
    }
  };

  const handleDelete = (id: string) => {
    if (!multiple) {
      if (singleFileState) {
        destroyBlob(singleFileState.preview);
      }

      setSingleFileState(null);
    } else {
      const fileToDelete = multipleFilesState.find(
        (fileItem) => fileItem.id === id
      );

      if (fileToDelete) {
        destroyBlob(fileToDelete.preview);
      }

      const newFiles = multipleFilesState.filter(
        (fileItem) => fileItem.id !== id
      );

      setMultipleFilesState(newFiles);
    }
  };

  const openFilesExplorer = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (
      inputRef &&
      inputRef.current &&
      (e.code === "Enter" || e.code === "Space")
    ) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(multiple ? multipleFilesState : singleFileState);
    }
  }, [onChange, singleFileState, multipleFilesState, multiple]);

  return (
    <div>
      {multipleFilesState.length > 0 && (
        <div className="multipleBox">
          {multipleFilesState.map((fileState) => (
            <Preview
              key={fileState.id}
              fileState={fileState}
              onDelete={handleDelete}
              shape={shape}
              size={size}
              showFileName={showFileName}
              showFileSize={showFileSize}
            />
          ))}
        </div>
      )}

      {!multiple && singleFileState ? (
        <Preview
          fileState={singleFileState}
          onDelete={handleDelete}
          shape={shape}
          size={size}
          showFileName={showFileName}
          showFileSize={showFileSize}
        />
      ) : (
        <div>
          <input
            id={name}
            name={name}
            ref={inputRef}
            accept="image/*"
            type="file"
            onChange={multiple ? handleFilesChange : handleFileChange}
            className="input"
            multiple={multiple}
          />
          <label
            htmlFor={name}
            className={`label ${shape} ${size}`}
            aria-label="upload image"
            tabIndex={0}
            onKeyDown={openFilesExplorer}
          >
            <img src={imageIcon} alt="" className="addPhotoIcon" />
          </label>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
