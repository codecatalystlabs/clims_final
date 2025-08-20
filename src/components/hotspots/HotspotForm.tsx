import React from 'react';
import { Button, Modal } from 'antd';
import useFormInput from '../../api/hooks/useFormInput';
import CustomInput from '../../common/input';


const HotspotForm = ({
  visible,
  onCancel,
  onSubmit,
  editMode,
  editHotSpot,
}: any) => {
  const hotspotName = useFormInput(editHotSpot?.name || '');
  const contactPersonName = useFormInput(
    editHotSpot?.contact_person_name || ''
  );
  const contactPersonPhone = useFormInput(
    editHotSpot?.contact_person_telephone || ''
  );
  const latitude = useFormInput(editHotSpot?.latitude || '');
  const longitude = useFormInput(editHotSpot?.longitude || '');
  const orgUnitId = useFormInput(editHotSpot?.id || '');
  const hotspotStatus = useFormInput(editHotSpot?.status || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      hotspot_name: hotspotName.value,
      contact_person_name: contactPersonName.value,
      contact_person_telephone: contactPersonPhone.value,
      latitude: latitude.value,
      longitude: longitude.value,
      organization_unit_id: orgUnitId.value,
      hotspot_status: hotspotStatus.value,
    });
  };

  return (
    <Modal
      title={editMode ? 'Edit Hotspot' : 'Create Hotspot'}
      centered
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={1000}
      footer={[
        <Button key="back" onClick={onCancel} className="text-customRed">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-black"
          onClick={handleSubmit}
        >
          OK
        </Button>,
      ]}
    >
      <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
        <CustomInput
          {...hotspotName}
          type="text"
          name="hotspot_name"
          label="Hotspot Name"
          placeholder="Enter Hotspot Name"
          act={true}
        />
        <CustomInput
          {...contactPersonName}
          type="text"
          name="contact_person_name"
          label="Contact Person Name"
          placeholder="Enter Contact Person Name"
          act={true}
        />
        <CustomInput
          {...contactPersonPhone}
          type="text"
          name="contact_person_telephone"
          label="Contact Person Phone"
          placeholder="Enter Contact Person Phone"
          act={true}
        />
        <CustomInput
          {...latitude}
          type="text"
          name="latitude"
          label="Latitude"
          placeholder="Enter Latitude"
          act={true}
        />
        <CustomInput
          {...longitude}
          type="text"
          name="longitude"
          label="Longitude"
          placeholder="Enter Longitude"
          act={true}
        />
        <CustomInput
          {...orgUnitId}
          type="number"
          name="organization_unit_id"
          label="Organization ID"
          placeholder="Enter Organization ID"
          act={true}
        />
        <CustomInput
          {...hotspotStatus}
          type="text"
          name="hotspot_status"
          label="Hotspot Status"
          placeholder="Enter Hotspot Status"
          act={true}
        />
      </form>
    </Modal>
  );
};

export default HotspotForm;
