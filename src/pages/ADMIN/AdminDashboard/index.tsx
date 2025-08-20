//@ts-nocheck
import React, { useEffect, useState } from 'react';

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import { displaySuccessMessage } from '../../../components/toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUser,
  getHotspots,
  getOrganizations,
  getRoles,
  getUsers,
} from '../../../api/apiRequests';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelEdit } from '../../../redux/slices/condom';
import axios from 'axios';
import UserTable from '../../../components/Table/userTable';
import { trimLastWord } from '../../../utils/trim';
const AdminDashboardADMIN = () => {
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [modalOpen, setModalOpen] = useState(false);
  const { edit, id } = useSelector((state: any) => state.condom);

  const [editUser, setEditUser] = useState(null);

  const [username, setUserName] = useState('');
  const [firstname, setFirstName] = useState<any>('');
  const [lastname, setLastName] = useState<any>('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState();
  const [organization_unit_id, setOrgUnit] = useState('');
  const [location, setLocation] = useState('');
  const [phone_number, setPhone] = useState('');
  const [roleData, setRoleData] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [users, setUsers] = useState();
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState('');
  const [subCounties, setCounties] = useState([]);
  const [subCounty, setCounty] = useState();

  const [region, setRegion] = useState('');
  const [facility, setFacility] = useState();
  const [facilities, setFacilities] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [hotspotId, setHotspotId] = useState("");
  const [districtHotspots, setDistrictHotspots] = useState();



  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) {
      //@ts-ignore
      const editUser = users?.filter((user) => user.id == id);
      setEditUser(editUser?.length > 0 ? editUser[0] : null);
    }
  }, [edit, id]);

  useEffect(() => {
    getRegions();
  }, []);

  useEffect(() => {
    getDistricts();
  }, [region]);

  useEffect(() => {
    getCounties();
  }, [district]);

  useEffect(() => {
    getFacilities();
  }, [subCounty]);

  const getRegions = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8000/api/regions'
      );
      setRegions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCounties = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/subCounties/${district}`
      );
      setCounties(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDistricts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/districts/${region}`
      );
      setDistricts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFacilities = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/healthCenters/${subCounty}`
      );
      setFacilities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange =
    (setState: (arg0: any) => void) => (event: { target: { value: any } }) => {
      setState(event.target.value);
    };

  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => getUsers(),
  });

  const rolesQuery = useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  });

  const orgQuery = useQuery({
    queryKey: ['org'],
    queryFn: () => getOrganizations(),
  });

  const hotspotQuery = useQuery({
    queryKey: ['hotspots'],
    queryFn: () => getHotspots(),
  });

  useEffect(() => {
    if (hotspotQuery.isSuccess) {
      setHotspots(hotspotQuery.data);
      // setRole(orgQuery.data)
    }
  }, [hotspotQuery.isSuccess, hotspotQuery.data]);
  useEffect(() => {
    if (orgQuery.isSuccess) {
      setOrgData(orgQuery.data);
      // setRole(orgQuery.data)
    }
  }, [orgQuery.isSuccess, orgQuery.data]);

  //fetch roles
  useEffect(() => {
    if (rolesQuery.isSuccess) {
      setRoleData(rolesQuery.data);
      // setRole(rolesQuery.data)
    }
  }, [usersQuery.isSuccess, rolesQuery.data]);

  useEffect(() => {
    if (usersQuery.isSuccess) {
      setUsers(usersQuery.data);
    }
  }, [usersQuery.isSuccess, usersQuery.data]);

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries(['user'], { exact: true });

      if (data.code == '201') {
        displaySuccessMessage('User created ');
        setModalOpen(false);
      }
    },
  });

  const handleEditUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/users/${id}`,
        {
          username,
          firstname,
          lastname,
          password,
          email,
          role,
          organization_unit_id,
          location,
          phone_number,
          district,
          region,
        }
      );

      if (res.data.code == '201') {
        displaySuccessMessage(res.data.message);
        setModalOpen(false);
      }
    } catch (error: any) {
      throw error;
    }
  };

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(hotspotId,"HOTTTT")

    createUserMutation.mutate({
      username,
      firstname,
      lastname,
      password,
      email,
      role,
      phone_number,
      district,
      region,
      subcounty: subCounty,
      organization_unit_id: facility ? facility : district,
      hotspot_id:hotspotId
    });
  };


  const handleDistrict = (e)=>{
    setDistrict(e.target.value)
    const disrict = districts.filter(data=>data.district_uid==e.target.value)
    const districtName =  disrict[0].district
    const filteredDistrictHotSpots = (hotspots ?? []).filter((item: { district: string }) =>
      item.district?.toLowerCase().includes(trimLastWord(districtName).toLowerCase())
    );

   setDistrictHotspots(filteredDistrictHotSpots)
  }

  const roleName = role?roleData.filter(role=>String(role.id)===String(role)):roleData

  return (
    <>
      <div>
        <div className="bg-red-700 z z-99999 flex flex-col items-center justify-between p-4 md:flex-row">
          <div>
            <h3 className="text-lg font-bold">User Managment</h3>
          </div>
          <div
            style={{ background: '' }}
            className="flex items-center justify-center space-x-4"
          >
            <div>
              <Button
                style={{
                  backgroundColor: '#006D5B',
                  color: 'white',
                  border: 'none',
                }}
                onClick={() => setModalOpen(true)}
                type="primary"
                icon={<PlusOutlined rev={undefined} />}
                size={size}
              >
                Create User
              </Button>
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
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-10 xl:col-span-8 ">
          {usersQuery.isLoading ? (
            <Spin tip="Loading Table data" size="large">
              <div className="content" />
            </Spin>
          ) : (
            <UserTable dataSource={users} />
            // <Table data={users} />
          )}
        </div>
      </div>

      <Modal
        title={edit ? 'Edit User' : 'Create User'}
        centered
        open={modalOpen || edit}
        //@ts-ignore
        onOk={edit ? handleEditUser : handleCreateUser}
        onCancel={() => {
          setModalOpen(false);
          if (edit) {
            dispatch(cancelEdit());
          }
        }}
        width={1000}
        zIndex={10000000}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalOpen(false);
              if (edit) {
                dispatch(cancelEdit());
              }
            }}
            className=" text-customRed"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="bg-black"
            onClick={edit ? handleEditUser : handleCreateUser}
          >
            OK
          </Button>,
        ]}
      >
        {edit ? (
          <form className="grid grid-cols-2 gap-2 ">
            <CustomInput
              onChange={handleInputChange(setFirstName)}
              value="firstname"
              placeholder="Enter firstname"
              label="firstname"
              type="text"
              name="firstname"
              defaultValue={editUser?.firstname}
            />
            <CustomInput
              onChange={handleInputChange(setLastName)}
              value="lastname"
              placeholder="Enter lastname"
              label="lastname"
              type="text"
              name="lastname"
              defaultValue={editUser?.lastname}
            />
            <CustomInput
              onChange={handleInputChange(setEmail)}
              value="email"
              placeholder="Enter email"
              label="email"
              type="text"
              name="email"
              defaultValue={editUser?.email}
            />
            <CustomInput
              onChange={handleInputChange(setLocation)}
              value="location"
              placeholder="Enter location"
              label="location"
              type="text"
              name="location"
              defaultValue={editUser?.location}
            />
            <CustomInput
              onChange={handleInputChange(setUserName)}
              value="username"
              placeholder="Enter username"
              label="username"
              type="text"
              name="username"
              defaultValue={editUser?.username}
            />

            <CustomInput
              onChange={handleInputChange(setPassword)}
              value="password"
              placeholder="Enter password"
              label="password"
              type="text"
              name="password"
              defaultValue={editUser?.password}
            />
            <CustomInput
              onChange={handleInputChange(setPhone)}
              value="phone_number"
              placeholder="Enter number"
              label="phone number"
              type="text"
              name="phone"
              defaultValue={editUser?.phone_number}
            />

            <CustomInput
              onChange={handleInputChange(setOrgUnit)}
              value="organization_unit_id "
              placeholder="Enter org id  "
              label="org"
              type="text"
              name="organization_unit_id"
              defaultValue={editUser?.organization_unit_id}
            />

            <select
              className="mt-8.5 box-border h-[3.2rem] w-[29rem] rounded-sm px-6 pr-2 "
              onChange={handleInputChange(setRole)}
              defaultValue={editUser?.role}
            >
              <option value="">Select role</option>
              {roleData.map((item: any) => (
                <option className="px-4" key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </form>
        ) : (
          <form className="grid grid-cols-2 gap-2 ">
            <CustomInput
              onChange={handleInputChange(setFirstName)}
              value="firstname"
              placeholder="Enter firstname"
              label="firstname"
              type="text"
              name="firstname"
              defaultValue={''}
            />
            <CustomInput
              onChange={handleInputChange(setLastName)}
              value="lastname"
              placeholder="Enter lastname"
              label="lastname"
              type="text"
              name="lastname"
              defaultValue={''}
            />
            <CustomInput
              onChange={handleInputChange(setEmail)}
              value="email"
              placeholder="Enter email"
              label="email"
              type="text"
              name="email"
              defaultValue={''}
            />

            <CustomInput
              onChange={handleInputChange(setUserName)}
              value="username"
              placeholder="Enter username"
              label="username"
              type="text"
              name="username"
              defaultValue={''}
            />

            <CustomInput
              onChange={handleInputChange(setPassword)}
              value="password"
              placeholder="Enter password"
              label="password"
              type="text"
              name="password"
              defaultValue={''}
            />
            <CustomInput
              onChange={handleInputChange(setPhone)}
              value="phone_number"
              placeholder="Enter number"
              label="phone number"
              type="text"
              name="phone"
              defaultValue={''}
            />
            <select
              className="mt-8.5 box-border h-[3.2rem] w-[29rem] rounded-sm px-6 pr-2 "
              onChange={handleInputChange(setRole)}
            >
              <option value="">Select role</option>
              {roleData.map((item: any) => (
                <option className="px-4" key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              className="mt-8.5 box-border h-[3.2rem] w-[29rem] rounded-sm px-6 pr-2 "
              onChange={handleInputChange(setRegion)}
            >
              <option value="">Select regions</option>
              {regions.map((item: any) => (
                <option
                  className="px-4"
                  key={item.region_uid}
                  value={item.region_uid}
                >
                  {item.region}
                </option>
              ))}
            </select>
            <select
              className="mt-8.5 box-border h-[3.2rem] w-[29rem] rounded-sm px-6 pr-2 "
              onChange={(e)=>handleDistrict(e)}
            >
              <option value="">Select district</option>

              {districts.map((item: any) => (
                <option
                  className="px-4"
                  key={item.district_uid}
                  value={item.district_uid}
                >
                  {item.district}
                </option>
              ))}
            </select>

            <select
              className="mt-8.5 box-border h-[3.2rem] w-[29rem] rounded-sm px-6 pr-2 "
              onChange={handleInputChange(setCounty)}
            >
              <option value="">Select sub county</option>
              {subCounties.map((item: any) => (
                <option
                  className="px-4"
                  key={item.subcounty_uid}
                  value={item.subcounty_uid}
                >
                  {item.subcounty}
                </option>
              ))}
            </select>
            {String(role)=="7"&&
            <select
              className="mt-8.5 box-border h-[3.2rem] w-[29rem] rounded-sm px-6 pr-2 "
              onChange={handleInputChange(setHotspotId)}
            >
              <option value="">Select Hotspot</option>
              {districtHotspots?.map((item: any) => (
                <option className="px-4" key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select> 
          }
          </form>
        )}
      </Modal>
    </>
  );
};

export default AdminDashboardADMIN;
