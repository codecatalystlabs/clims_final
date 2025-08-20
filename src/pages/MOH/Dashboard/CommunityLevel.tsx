import CustomCard from '../../../components/CustomCard';

function CommunityLevel() {
  const dataObj = [
    {
      id: 1,
      amount: 200,
      text: 'Stock recieved',
      // percentage: 0.43
    },
    {
      id: 2,
      amount: 150,
      text: 'Stock  at hand',
      // percentage: 0.43
    },
    {
      id: 3,
      amount: 50,
      text: 'Stock dispensed',
      // percentage: 0.43
    },
    {
      id: 4,
      amount: '3 Months',
      text: 'Month of stock',
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

export default CommunityLevel;
