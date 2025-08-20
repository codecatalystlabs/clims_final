import CustomCard from '../../../components/CustomCard';

interface Ip {
  total: number;
  totalDistribution: number;
  avg: number;
}

function NationalLevel({ total, totalDistribution, avg }: Ip) {
  const dataObj = [
    {
      id: 1,
      amount: total,
      text: 'Stock On Hand',
      // percentage: 0.43
    },
    {
      id: 2,
      amount: totalDistribution,
      text: 'Stock Dispensed',
      // percentage: 0.43
    },
    {
      id: 3,
      amount: avg,
      text: 'Avg. Stock Consumption',
      // percentage: 0.43
    },
    {
      id: 4,
      amount: '2 Months',
      text: 'Month Of Stock',
      // percentage: 0.43
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {dataObj.map(({ amount, text, percentage, id }: any) => (
        <CustomCard
          key={id}
          amount={amount}
          title={text}
          percentage={percentage}
        />
      ))}
    </div>
  );
}

export default NationalLevel;
