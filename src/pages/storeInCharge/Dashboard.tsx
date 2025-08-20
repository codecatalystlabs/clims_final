
import { useState } from 'react';
import CustomCard from '../../components/dcfp/CustomCard';
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo';
import ChartThree from '../../components/ChartThree';

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [activeUsers, setActiveUsers] = useState(0)
    const [total, setTotal] = useState()


    //   const usersQuery = useQuery({
    //     queryKey: ["user"],
    //     queryFn: () => getUsers(),
    //   })

    //   useEffect(() => {
    //     if (usersQuery.isSuccess) {
    //       setUsers(usersQuery.data)
    //       const active = usersQuery.data.filter((user:any) => user.status === 'active');
    //       setActiveUsers(active)
    //     }
    //   }, [usersQuery.isSuccess, usersQuery.data]);




    const cardData = [
        {
            id: 1,
            amount: users.length || 0,
            text: "Total Condoms Recieved",
            // percentage: 0.43
        },
        {
            id: 2,
            amount: activeUsers?.length || 0,
            text: "Total Condoms Distributed",
            // percentage: 0.43
        },
        {
            id: 3,
            amount: users.length - activeUsers?.length || 200,
            text: "Condoms At Hand",
            // percentage: 0.43
        }
    ]



    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

                {cardData.map(({ amount, text, percentage, id }) => <CustomCard key={id} amount={amount} text={text} percentage={percentage} currency={''} />)}


            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        {/* <MapOne /> */}
      </div>

        </>
    );
};

export default Dashboard;
