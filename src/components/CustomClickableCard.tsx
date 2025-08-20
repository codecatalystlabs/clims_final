import React from 'react';
import { Link } from 'react-router-dom';

interface CustomCardProps {
  text: string;
  link: any;
}

const CustomClickableCard: React.FC<CustomCardProps> = ({ link, text }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center   ">
        <h3>{text}</h3>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <Link
            to={`${link}`}
            className="text-sm font-bold text-black hover:underline dark:text-white"
          >
            view details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomClickableCard;
