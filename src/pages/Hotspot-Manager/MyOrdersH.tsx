import React, { useState } from 'react';
import CustomCard from '../../components/CustomCard';
import DfcpDataTable from '../../components/dcfp/DfcpTable';
import CustomPicker from '../../common/datepicker';
import { Button, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import CustomInput from '../../common/input';

const MyOrdersH = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const cardData = [
    {
      id: 1,
      title: 'Orders Submitted',
      amount: 10,
    },
    {
      id: 2,
      title: 'My Orders Worked On',
      amount: 8,
    },
    {
      id: 3,
      title: 'Success rate',
      amount: 12,
    },
  ];
  return (
    <>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
          {cardData.map(({ title, amount, id }) => (
            <CustomCard key={id} title={title} amount={amount} percentage={0} />
          ))}
        </div>
        <div className="flex items-center justify-between p-[2rem]">
          <div className="mt-[2rem] p-[1rem] text-left font-bold">
            <h1>Orders Table</h1>
          </div>
          <div className="flex  h-full w-[50vw] items-center justify-between">
            <p>Select Range of display </p>
            <CustomPicker />
            <Button
              onClick={() => setModalOpen(true)}
              style={{
                backgroundColor: '#006D5B',
                color: 'white',
                border: 'none',
              }}
              type="primary"
              icon={<DownloadOutlined rev={undefined} size={50} />}
            >
              Order
            </Button>
          </div>
        </div>
        <DfcpDataTable data={undefined} />

        <Modal
          title="Create An Order"
          centered
          open={modalOpen}
          //@ts-ignore
          //   onOk={edit ? handleEditUser : handleCreateUser}
          onCancel={() => {
            setModalOpen(false);
          }}
          width={700}
          zIndex={10000000}
          footer={[
            <Button
              key="back"
              onClick={() => {
                setModalOpen(false);
              }}
              className=" text-customRed"
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              className="bg-black"
              // onClick={edit ? handleEditUser : handleCreateUser}
            >
              OK
            </Button>,
          ]}
        >
          <CustomInput
            label={'From'}
            placeholder={'Hotspot requesting'}
            type={'text'}
            name={'ordered_for '}
            value={'ordered_for '}
            defaultValue={''}
          />

          <CustomInput
            label={'To'}
            placeholder={'Recievers name'}
            type={'text'}
            name={'ordered_from '}
            value={'ordered_from '}
            defaultValue={''}
          />

          <CustomInput
            label={'Quantity Needed'}
            placeholder={'Recievers name'}
            type={'text'}
            name={'quantity_needed'}
            value={''}
            defaultValue={''}
          />

          <CustomInput
            label={'Unit'}
            placeholder={'Unit '}
            type={'text'}
            name={'unit'}
            value={'unit'}
            defaultValue={''}
          />
        </Modal>
      </div>
    </>
  );
};

export default MyOrdersH;
