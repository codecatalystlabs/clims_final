import ChartOne from '../../components/ChartOne';
import ChartThree from '../../components/ChartThree';
import ChartTwo from '../../components/ChartTwo';
import CustomCard from '../../components/CustomCard';

const FocalPerson = () => {
  const cardData = [
    {
      id: 1,
      title: 'Condoms Recieved',
      amount: 0,
    },
    {
      id: 2,
      title: 'Condoms Distributed',
      amount: 0,
    },
    {
      id: 3,
      title: 'Condoms At Hand',
      amount: 0,
    },
  ];
  return (
    <>
      <div>
        <div></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {cardData.map(({ title, amount, id }) => (
            <CustomCard key={id} title={title} amount={amount} percentage={0} />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne />
        <ChartTwo />
        <ChartThree /> */}
        {/* <MapOne /> */}
      </div>
    </>
  );
};

export default FocalPerson;
