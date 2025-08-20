import React from 'react'
import { Link } from 'react-router-dom'

export default function FileCard({name,id}:{name:string,id:string}) {
    const getImageSrc = (filename:string) => {
        const extension = filename.split('.').pop();
        switch (extension) {
          case 'pdf':
            return '/pdf.svg'; // Update with the path to your PDF icon
          case 'doc':
          case 'docx':
            return '/doc.svg'; // Update with the path to your DOC icon
          case 'xls':
          case 'xlsx':
            return '/excel.svg'; // Update with the path to your Excel icon
          // Add more cases as needed
          default:
            return '/txt.png'; // Update with the path to your default icon
        }
      };
      const imgSrc = getImageSrc(name);

    return (
              <div className='flex flex-col items-center'>
          <img src={imgSrc} alt="photo" className="w-20 h-20 mb-2" />
          <p className="text-center text-black font-medium">{name}</p>
      </div>

    )
}
