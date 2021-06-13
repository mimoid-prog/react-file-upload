const createBlob = (file: File): string => {
  return URL.createObjectURL(file);
};

export default createBlob;
