//@ts-nocheck
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FileCard from '../../components/FileCard';

const baseURL = 'http://localhost/clims_backend/clims/public';

export default function Files() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const evidences = JSON.parse(
    decodeURIComponent(queryParams.get('evidences'))
  );
  function extractFilename(url) {
    return url.split('/').pop();
  }
  return (
    <div>
      <h2 className="p-[1rem] text-lg font-extrabold capitalize text-black-2">
        Document files
      </h2>
      {
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {evidences.map((evidence, index) => {
            const filename = extractFilename(evidence.evidence_location);
            return (
              <a
                href={`${baseURL}/${evidence.evidence_location}`}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-1"
              >
                <FileCard name={filename} />
              </a>
            );
          })}
        </div>
      }
    </div>
  );
}
