const destroyBlob = (blobURL: string): void => {
  URL.revokeObjectURL(blobURL);
};

export default destroyBlob;
