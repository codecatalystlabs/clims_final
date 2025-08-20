import React from 'react';

type CustomSelectProps = {
  label: string;
  name: string | undefined;
  options: Array<{ value: string; label: string }>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  label,
  name,
  options,
  onChange,
}) => {
  return (
    <div>
      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black ">{label}</label>
        <div className="relative text-black">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option>select</option>
            {options?.map((option: any) => (
              <option className="text-black" key={option.id} value={option.id || option.region_uid || option.district_uid|| option.value}>
                {option.name ||option.category || option.region || option.district || option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;

// {
//   "contact_person_name":"baluku",
//   "contact_person_telephone":"0773078860",
//   "latitude":"6.6565",
//   "longtitude":"5.7755",
//   "hid":"34",
//   "mapped_on":"2023-10-05",
//   "mapped_by":"1",
//   "type":"bar",
//   "name":"kikoni bar",
//   "district":"kampala",
//   "division":"lubaga",
//   "village":"kawe",
//   "contact_person_id":"img/id.jpg",
//   "status":"open",
//   "has_condom_dispenser":"yes",
//   "dispenser_condition":"okay",
//   "comment":"good condition",
//   "entered_by":"1",
//   "entry_date":"2023-10-01",
//   "last_modified":"2023-07-09",
//   "modified_by":"1"

// }
