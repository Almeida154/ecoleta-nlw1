import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface IDropzone {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<IDropzone> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // @ts-ignore
    accept: 'image/*',
  });

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
      {selectedFileUrl ? (
        // @ts-ignore
        <img src={selectedFileUrl} alt='Point thumbnail' />
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
