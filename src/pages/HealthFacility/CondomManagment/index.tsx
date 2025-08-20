


import CustomCard from '../../../components/CustomCard';
import DfcpDataTable from '../../../components/dcfp/DfcpTable';
import CustomPicker from '../../../common/datepicker';

const CondomDashboard = () => {
    const cardData = [
        {
            id: 1,
            title: 'Orders Recieved',
            amount: 0,

        },
        {
            id: 2,
            title: 'Orders Worked On',
            amount: 0,

        },
        {
            id: 3,
            title: 'Success rate',
            amount: "0%",

        },
    ];
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                {cardData.map(({ title, amount, id }) => (
                    <CustomCard
                        key={id}
                        title={title}
                        amount={amount}
                        percentage={0} />
                ))}
            </div>
            <div className='flex justify-between items-center p-[2rem]'>
                <div className='mt-[2rem] p-[1rem] text-left font-bold'><h1>Orders Table</h1></div>
                <div>
                    <p>Select Range of display </p>
                    <CustomPicker />
                </div>
            </div>
            <DfcpDataTable data={undefined} />
        </div>
    )
}

export default CondomDashboard