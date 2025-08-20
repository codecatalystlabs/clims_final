//@ts-nocheck

import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import CondomChart from '../../../components/CondomChart';
import CondomBarChart from '../../../components/DistributedStockChart';
import CondomPieChart from '../../../components/HotspotDistributedTo';
import CondomQuantityDistributed from '../../../components/QuantityDistributed';

const { RangePicker } = DatePicker;

interface Props {
  data: any[]; // Assuming this is the data array you want to filter
}

const CondomDistributionSummary: React.FC<Props> = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [dates, setDates] = useState<[Moment, Moment] | null>(null);

  useEffect(() => {
    if (dates) {
      const [start, end] = dates;
      const filtered = data.filter((item: any) => {
        const updatedAt = moment(item.updated_at);
        const year = updatedAt.year();
        const month = updatedAt.month() + 1; // Months are zero-indexed in moment.js
        const startYear = start.year();
        const endYear = end.year();
        const startMonth = start.month() + 1; // Months are zero-indexed in moment.js
        const endMonth = end.month() + 1; // Months are zero-indexed in moment.js
  
        return (
          (year > startYear || (year === startYear && month >= startMonth)) &&
          (year < endYear || (year === endYear && month <= endMonth))
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [dates, data]);
  

  const handleDateChange = (dates: [Moment, Moment] | null) => {
    setDates(dates);
  };

  return (
    <div className='flex flex-col'>
            <div className="flex items-center justify-end space-x-5 p-[2rem] ">
      <RangePicker
        style={{ marginBottom: '20px' }}
        onChange={handleDateChange}
        picker="month"
        format="YYYY-MM"
        disabledDate={(current) => {
          return current && current.endOf('month') > moment().endOf('month');
        }}
      /> 
          </div>


      <CondomChart data={filteredData} />

      <div className="mt-5">
        <CondomBarChart data={filteredData} />
      </div>

      <div className='mt-5'>
        <CondomQuantityDistributed data={filteredData} />
      </div>

      {/* <div className="flex mt-10">
        <div className="flex-1 ml-4">
          <CondomPieChart data={filteredData} />
        </div>
      </div> */}
    </div>
  );
}

export default CondomDistributionSummary;
