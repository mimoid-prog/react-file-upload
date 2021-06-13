export type FileStateItem = {
  id: string;
  preview: string;
  value: any;
};

export type FileState = FileStateItem | null;

export type FilesState = FileStateItem[];

export type Shape = "square" | "rounded" | "circle";

export type Size = "small" | "medium" | "big";
