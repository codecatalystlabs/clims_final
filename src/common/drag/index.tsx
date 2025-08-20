// CustomDrag component with a callback prop
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadProps,  UploadFile } from 'antd';

const { Dragger } = Upload;

interface CustomDragProps {
  onFileChange: (fileList: UploadFile<any>[]) => void;
}

const CustomDrag: React.FC<CustomDragProps> = ({  }) => {
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status, fileList } = info;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        onFileChange(fileList);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for pdf, word docs , png, jpeg and all other sorts of formats
      </p>
    </Dragger>
  );
};

export default CustomDrag;
