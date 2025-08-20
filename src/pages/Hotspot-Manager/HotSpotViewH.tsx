import { useState } from 'react';

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { useDispatch } from 'react-redux';
import CustomAlert from '../../common/alert';

const HotSpotViewH = () => {
  const dispatch = useDispatch();

  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div>
        <CustomAlert
          hotspotname="Lugogo Hotspot"
          desc="This hotspot is requesting for verification to be active on the system"
        />
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">Hotspot Managment</h3>
          </div>
          <div
            style={{ background: '' }}
            className="flex items-center justify-center space-x-4"
          >
            <div>
              {/* <Button
                                style={{ backgroundColor: '#006D5B', color: 'white', border: 'none' }}
                                onClick={() => setModalOpen(true)} type="primary" icon={< PlusOutlined rev={undefined} />} size={size}>
                                Toggle
                            </Button> */}
            </div>

            <div>
              <Button
                style={{
                  backgroundColor: '#006D5B',
                  color: 'white',
                  border: 'none',
                }}
                type="primary"
                icon={<DownloadOutlined rev={undefined} />}
                size={size}
              >
                Export Excel
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-10 xl:col-span-8">
          {/* {hotspotQuery.isLoading ? <Spin tip="Loading Table data" size="large">
                        <div className="content" />
                    </Spin> : <HotspotDataTable data={data} />}

                    {localStorage.setItem("hotspots", JSON.stringify(data))} */}
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* <ChartOne />
                    <ChartTwo />
                    <ChartThree />
                    <MapOne /> */}
        </div>
      </div>

      {/* <Modal
                title={edit ? "Edit Hotspot" : "Create Hotspot"}
                centered
                open={modalOpen || edit}
                //@ts-ignore
                onOk={edit ? handleEdit : createHotspotFn}
                onCancel={() => {
                    setModalOpen(false);
                    if (edit) {
                        // Dispatch the editAction here
                        dispatch(cancelEdit());
                    }
                }}
                width={1000}
                zIndex={10000000}
            >
                {edit ? (<form onSubmit={handleEdit} className='grid grid-cols-2 gap-2'>
                    <CustomInput defaultValue={editHotSpot?.hotspot_name} onChange={handleInputChange(setHotspotName)} value='hotspot_name' placeholder='Enter Hotspot Name' label='Hotspot Name' type='text' name="hotspot_name" />
                    <CustomInput defaultValue={editHotSpot?.contact_person_name} onChange={handleInputChange(setContactPersonName)} value='contact_person_name' placeholder='Enter contact person name' label='Contact Person Name' type='text' name="contact_person_name" />
                    <CustomInput defaultValue={editHotSpot?.contact_person_telephone} onChange={handleInputChange(setContactPersonPhone)} value='contact_person_telephone' placeholder='Enter Contact Person Phone' label='Contact Person Phone' type='text' name="contact_person_telephone" />
                    <CustomInput defaultValue={editHotSpot?.latitude} onChange={handleInputChange(setLatitude)} value='latitude' placeholder='Enter latitude' label='Latitude' type='text' name="latitude" />
                    <CustomInput defaultValue={editHotSpot?.longtitude} onChange={handleInputChange(setLongtitude)} value='longtitude' placeholder='Enter longtitude' label='longtitude' type='text' name="longtitude" />
                    <CustomInput defaultValue={editHotSpot?.organization_unit_id} onChange={handleInputChange(setOrgUnit)} value='organization_unit_id' placeholder='Enter orgID' label='OrganizationID' type='number' name="rganization_unit_id" />
                    <CustomInput defaultValue={editHotSpot?.hotspot_status} onChange={handleInputChange(setHotspotStatus)} value='hotspot_status' placeholder='Enter Hotspot' label='Hotspot Status' type='text' name="hotspot_status" />
                </form>) : (<form className='grid grid-cols-2 gap-2'>
                    <CustomInput onChange={handleInputChange(setHotspotName)} value='hotspot_name' placeholder='Enter Hotspot Name' label='Hotspot Name' type='text' name="hotspot_name" />
                    <CustomInput onChange={handleInputChange(setContactPersonName)} value='contact_person_name' placeholder='Enter contact person name' label='Contact Person Name' type='text' name="contact_person_name" />
                    <CustomInput onChange={handleInputChange(setContactPersonPhone)} value='contact_person_telephone' placeholder='Enter Contact Person Phone' label='Contact Person Phone' type='text' name="contact_person_telephone" />
                    <CustomInput onChange={handleInputChange(setLatitude)} value='latitude' placeholder='Enter latitude' label='Latitude' type='text' name="latitude" />
                    <CustomInput onChange={handleInputChange(setLongtitude)} value='longtitude' placeholder='Enter longtitude' label='longtitude' type='text' name="longtitude" />
                    <CustomInput onChange={handleInputChange(setOrgUnit)} value='organization_unit_id' placeholder='Enter orgID' label='OrganizationID' type='number' name="rganization_unit_id" />
                    <CustomInput onChange={handleInputChange(setHotspotStatus)} value='hotspot_status' placeholder='Enter Hotspot' label='Hotspot Status' type='text' name="hotspot_status" />
                </form>)}
            </Modal> */}
    </>
  );
};

export default HotSpotViewH;
