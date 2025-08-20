import React, { useEffect, useState } from 'react';

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import Table from '../../../components/Table/index';
import { displaySuccessMessage } from '../../../components/toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUser,
  getOrganizations,
  getRoles,
  getUsers,
  updateUser,
} from '../../../api/apiRequests';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelEdit } from '../../../redux/slices/condom';
import axios from 'axios';
import AgentsDataTable from './AgentsTable';
const AgentsUI = () => {
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [modalOpen, setModalOpen] = useState(false);
  const { edit, id } = useSelector((state: any) => state.condom);
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState(null);

  // const navigate = useNavigate();
  // const [username, setUserName] = useState("");
  // const [firstname, setFirstName] = useState("");
  // const [lastname, setLastName] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  // const [organization_unit_id, setOrgUnit] = useState("");
  // const [location, setLocation] = useState("");
  // const [phone_number, setPhone] = useState("");
  // const [roleData, setRoleData] = useState([]);
  // const [orgData, setOrgData] = useState([]);
  // const [username, setUserName] = useState<string>()
  // const [users, setUsers] = useState();

  // useEffect(() => {
  //     if (edit) {

  //         //@ts-ignore
  //         const editUser = users?.filter((user) => user.id == id)
  //         setEditUser(editUser?.length > 0 ? editUser[0] : null)
  //     }
  // }, [edit, id])

  // const handleInputChange =
  //     (setState: (arg0: any) => void) =>
  //         (event: { target: { value: any } }) => {
  //             setState(event.target.value);
  //             // console.log(event.target.value);
  //         };

  // const queryClient = useQueryClient();

  // const usersQuery = useQuery({
  //     queryKey: ["user"],
  //     queryFn: () => getUsers()
  // });

  // const rolesQuery = useQuery({
  //     queryKey: ["roles"],
  //     queryFn: () => getRoles()
  // });

  // const orgQuery = useQuery({
  //     queryKey: ["org"],
  //     queryFn: () => getOrganizations()
  // });

  // useEffect(() => {
  //     if (orgQuery.isSuccess) {
  //         setOrgData(orgQuery.data);
  //         // setRole(orgQuery.data)
  //     }
  // }, [orgQuery.isSuccess, orgQuery.data]);

  // //fetch roles
  // useEffect(() => {
  //     if (rolesQuery.isSuccess) {
  //         setRoleData(rolesQuery.data);
  //         // setRole(rolesQuery.data)
  //     }
  // }, [usersQuery.isSuccess, rolesQuery.data]);

  // useEffect(() => {
  //     if (usersQuery.isSuccess) {
  //         setUsers(usersQuery.data);
  //     }
  // }, [usersQuery.isSuccess, usersQuery.data]);

  // const createUserMutation = useMutation({
  //     mutationFn: createUser,
  //     onSuccess: (data) => {
  //         queryClient.setQueryData(["user"], data);
  //         queryClient.invalidateQueries(["user"], { exact: true });

  //         if (data.code == "201") {
  //             displaySuccessMessage("User created ");
  //             setModalOpen(false);
  //         }
  //     }
  // });

  // const updateUserMutation = useMutation({
  //     mutationFn: updateUser,
  //     onSuccess(data: any) {
  //         queryClient.setQueryData(["updateUser"], data);
  //         queryClient.invalidateQueries(["updateUser"], { exact: true });

  //         if (data.code == "201") {
  //             displaySuccessMessage("User created ");
  //             setModalOpen(false);
  //         }
  //     },
  // })

  // const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     updateUserMutation.mutate({
  //         username:editUser.username,
  //         firstname,
  //         lastname,
  //         password,
  //         email,
  //         role,
  //         organization_unit_id,
  //         location,
  //         phone_number
  //     });
  // };

  return (
    <>
      <div>
        <div className="bg-red-700 z-99999 flex items-center justify-between p-4 ">
          <div>
            <h3 className="text-lg font-bold">Agents Managment</h3>
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
                Create Agent
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

        <div className="col-span-12 mt-10 xl:col-span-8">
          <AgentsDataTable />
        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"></div>
      </div>
    </>
  );
};

export default AgentsUI;
