# @mimoid-prog/react-file-upload

React component for uploading files.

## Live examples 
https://codesandbox.io/s/mimoid-progreact-file-upload-playground-l7b22?file=/src/App.js

## Installation

```
npm install @mimoid-prog/react-file-upload
```

or

```
yarn add @mimoid-prog/react-file-upload
```

## Usage

```jsx
import FileUpload from "@mimoid-prog/react-file-upload";

function App() {
  const handlePhotoChange = (photo) => {
    console.log(photo);
  };
  
  const handlePhotosChange = (photos) => {
    console.log(photos);
  }
  
  return (
    <div>
      <p>Single file upload</p>
      <FileUpload name="photo" onChange={handlePhotoChange} />
      <p>Multiple files upload</p>
      <FileUpload name="photos" onChange={handlePhotosChange} multiple />
    </div>
  );
}
```
