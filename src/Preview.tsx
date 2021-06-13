import { Shape, Size, FileState } from "./types";
import shorten from "./utils/shorten";

type Props = {
  fileState: FileState;
  onDelete: (id: string) => void;
  shape: Shape;
  size: Size;
  showFileName: boolean;
  showFileSize: boolean;
};

const Preview = ({
  fileState,
  onDelete,
  shape,
  size,
  showFileName,
  showFileSize
}: Props) => {
  if (!fileState) return null;

  let fileSize = "";

  const fileSizeInKB = fileState.value.size / 1024;

  if (fileSizeInKB > 1000) {
    fileSize = `${(fileSizeInKB / 1024).toFixed(1)} MB`;
  } else {
    fileSize = `${fileSizeInKB.toFixed(1)} KB`;
  }

  return (
    <div className="preview">
      <img
        src={fileState.preview}
        alt="Remove icon"
        className={`previewImage ${shape} ${size}`}
      />

      <div className="previewDataBox">
        <div>
          {showFileName && (
            <p className="fileName">{shorten(fileState.value.name, 15)}</p>
          )}
          {showFileSize && <p className="fileSize">{fileSize}</p>}
          <button className="deleteBtn" onClick={() => onDelete(fileState.id)}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
