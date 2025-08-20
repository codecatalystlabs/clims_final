export const AverageConsumption = (data: any) => {

    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    const lastThreeMonthsData = data.filter((transaction: any) => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate >= threeMonthsAgo;
    });

    const totalConsumption = lastThreeMonthsData.reduce(
        (sum: number, transaction: { transaction_quantity: any; }) => sum + parseInt(transaction.transaction_quantity),
        0
    );

    const averageMonthlyConsumption =
        totalConsumption / lastThreeMonthsData.length;

    const roundedResult = averageMonthlyConsumption.toFixed(0);

    return parseInt(roundedResult);
};



