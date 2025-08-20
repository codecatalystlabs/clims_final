import React from 'react'
import CustomCard from '../../../components/CustomCard'

function NationalLevel() {

  const dataObj = [
    {
      id: 1,
      amount: 20000,
      text: "Total Condoms  At Hand",
      // percentage: 0.43
    },
    {
      id: 2,
      amount: 15000,
      text: "Total Condoms Used",
      // percentage: 0.43
    }
  ]
  
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

    {dataObj.map(({ amount, text, percentage, id }) => <CustomCard key={id} amount={amount} title={text} percentage={percentage} currency={''} />)}


  </div>
  )
}

export default NationalLevel