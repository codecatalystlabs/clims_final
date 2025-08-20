import React from 'react';
import ChartOne from '../../../components/ChartOne';
import ChartThree from '../../../components/ChartThree';
import ChartTwo from '../../../components/ChartTwo';
import CustomCard from '../../../components/CustomCard';
import MapOne from '../../../components/MapOne';

const DashboardJms = () => {
  const cardData = [
    {
      id: 1,
      currency: '$',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    },
    {
      id: 2,
      currency: '$',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    },
    {
      id: 3,
      currency: '$',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    },
    {
      id: 4,
      currency: '$',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    },
    {
      id: 5,
      currency: '$',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    }
  ]
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map(({ currency, amount, text, percentage, id }) => <CustomCard key={id} currency={currency} amount={amount} text={text} percentage={percentage} />)}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
      </div>
    </>
  );
};

export default DashboardJms;
