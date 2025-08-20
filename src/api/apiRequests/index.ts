import axios from 'axios';

const baseURL = 'https://clims.health.go.ug/api';

interface loginData {
  username: string;
  password: string;
}

interface hotspotData {
  hotspot_name: string;
  contact_person_name: string;
  contact_person_telephone: string;
  latitude: number | undefined;
  longtitude: number | undefined;
  organization_unit_id: number | undefined;
  hotspot_status: string;
}

interface userData {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: string;
  organization_unit_id: string;
  location: string;
  phone_number: string;
  district: string;
  region: string;
  subcounty: string;
  hotspot_id:string;
}

interface orderData {
  ordered_for: any;
  ordered_from: any;
  unit: any;
  quantity_needed: any;
  ordered_by: any;
}

const loginUser = async ({ username, password }: loginData) => {
  const res = await axios
    .post(`${baseURL}/login`, {
      username,
      password,
    });
  return res.data;
};

const createOrder = async ({
  ordered_for,
  ordered_by,
  ordered_from,
  unit,
  quantity_needed,
}: orderData) => {
  const res = await axios
    .post(`${baseURL}/orders`, {
      unit,
      quantity_needed,
      ordered_by,
      ordered_for,
      ordered_from,
    });
  return res.data;
};

const addCondoms = async (data: any) => {
  const res = await axios.post(`${baseURL}/condoms`, data);
  return res.data;
};

const updateCondomItem = async (data: any, id: string) => {
  const res = await axios.patch(`${baseURL}/condoms/${id}`, data);
  return res.data;
};

const updateUser = async (
  {
    username,
    password,
    firstname,
    lastname,
    email,
    role,
    organization_unit_id,
    location,
    phone_number,
  }: userData,
  id: string
) => {
  const res = await axios
    .put(`${baseURL}/users/${id}`, {
      username,
      password,
      firstname,
      lastname,
      email,
      role,
      organization_unit_id,
      location,
      phone_number,
    });
  return res.data;
};

const deleteCondom = async (id: any) => {
  console.log(id);
  const res = await axios.delete(`${baseURL}/condoms/${id}`);
  return res.data;
};

const createUser = async ({
  username,
  password,
  firstname,
  lastname,
  email,
  role,
  organization_unit_id,
  location,
  phone_number,
  district,
  region,
  subcounty,
  hotspot_id
}: userData) => {
  //@ts-ignore
  // const data = JSON.parse(localStorage.getItem('userData'));
  // console.log(data.token);
  const res = await axios
    .post(
      `${baseURL}/users`,
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
        subcounty,
        hotspot_id
      }

    );
  return res.data;
};

const createHotspot = async ({
  hotspot_name,
  contact_person_name,
  contact_person_telephone,
  latitude,
  longtitude,
  organization_unit_id,
  hotspot_status,
}: hotspotData) => {
  //@ts-ignore
  // const data = JSON.parse(localStorage.getItem('userData'));
  // console.log(data.token);
  const res = await axios
    .post(
      `${baseURL}/hotSpots`,
      {
        hotspot_name,
        contact_person_name,
        contact_person_telephone,
        latitude,
        longtitude,
        organization_unit_id,
        hotspot_status,
      }
      // {
      //   headers: {
      //     Authorization: `Bearer ${data.token}`, // Add the token to the Authorization header
      //   },
      // }
    );
  return res.data;
};

const getUsers = async () => {
  const res = await axios.get(`${baseURL}/users`);
  return res.data;
};

const getRegions = async () => {
  const res = await axios.get(`${baseURL}/regions`);
  return res.data;
};

const getDistributions = async () => {
  const res = await axios.get(`${baseURL}/distributions`);
  return res.data;
};

const getUserNotifications = async (id:string) => {
  const res = await axios.get(`${baseURL}/users/${id}/allNotifications`);
  return res.data;
};

const getDistrictsForRegion = async (region_uid: string) => {
  const res = await axios
    .get(`${baseURL}/districts/${region_uid}`);
  return res.data;
};

const getSubCounties = async (district_uid: string) => {
  const res = await axios
    .get(`${baseURL}/subCounties/${district_uid}`);
  return res.data;
};

const getRoles = async () => {
  const res = await axios.get(`${baseURL}/roles`);
  return res.data;
};

const getCondoms = async () => {
  const res = await axios.get(`${baseURL}/condoms`);
  return res.data;
};

const getStock = async () => {
  const res = await axios.get(`${baseURL}/allStock`);
  return res.data;
};

const getStockAtHotspots = async () => {
  const res = await axios.get(`${baseURL}/hotspots/stockHistory`);
  return res.data;
};

const getCondomInventory = async () => {
  const res = await axios.get(`${baseURL}/condomInventories`);
  return res.data;
};

const getOrders = async () => {
  const res = await axios.get(`${baseURL}/orders`);
  return res.data;
};

const getMyOrders = async (id: any) => {
  const res = await axios
    .get(`${baseURL}/orders/ordersFromOrganization/${id}`);
  return res.data;
};

const addCondomInventory = async (data: any) => {
  const res = await axios.post(`${baseURL}/registerStock`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

const getInventory = async (id: string) => {
  const res = await axios
    .get(`${baseURL}/condomInventories/${id}`);
  return res.data;
};

const getReceivedOrders = async (id: string) => {
  const res = await axios
    .get(`${baseURL}/orders/ordersAtOrganization?ordered_to=${id}`);
  return res.data;
};
const getReceivedOrder = async (id: any) => {
  const res = await axios
    .get(`${baseURL}/orders/ordersAtOrganization/${id}`);
  return res.data;
};

const deleteCondomInventory = async (id: string) => {
  const res = await axios
    .delete(`${baseURL}/condomInventories/${id}`);
  return res.data;
};

const deleteUser = async (id: string) => {
  const res = await axios.delete(`${baseURL}/users/${id}`);
  return res.data;
};

const deleteHotspot = async (id: string) => {
  const res = await axios.delete(`${baseURL}/hotSpots/${id}`);
  return res.data;
};

const updateCondomInventory = async ({ data, id }: any) => {
  const res = await axios
    .put(`${baseURL}/condomInventories/${id}`, data);
  return res.data;
};

const additionToStock = async ({ data, id }: any) => {
  const res = await axios.put(`${baseURL}/topUpStock/${id}`, data);
  return res.data;
};

const editNotification = async (id: any) => {
  const res = await axios.post(`${baseURL}/notifications/${id}/markAsRead`);
  return res.data;
};


const editCondom = async ({ data, id }: any) => {
  // console.log("id***", id)
  const res = await axios.put(`${baseURL}/condoms/${id}`, data);
  return res.data;
};

const distributionToStock = async (data:any) => {
  const id = data.get('stockIdProp');
  const res = await axios
    .post(`${baseURL}/distributeStock/${id}`, data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  return res.data;                      
};

const updateReceivedOrder = async ({ data, id }: any) => {
  const res = await axios
    .patch(`${baseURL}/orders/${id}/handleOrder`, data);
  return res.data;
};

const updateHotspot = async ({ data, id }: any) => {
  const res = await axios.put(`${baseURL}/hotSpots/${id}`, data);
  return res.data;
};

const getUnits = async () => {
  const res = await axios.get(`${baseURL}/unitOfMeasures`);
  return res.data;
};

const getOrganizations = async () => {
  const res = await axios.get(`${baseURL}/organizationUnits`);
  return res.data;
};

const getStockAtOrganization = async (org: any) => {
  const res = await axios.get(`${baseURL}/stockAtOrganization/${org}`);
  return res.data;
};

const getHotspots = async () => {
  const res = await axios.get(`${baseURL}/hotSpots`);
	return res.data

};

const getStockAtDistrict = async () => {
  const res = await axios.get(`${baseURL}/stockPerDistrict`);
  return res.data;
};

export {
  getStockAtDistrict,
  loginUser,
  createUser,
  getUsers,
  getCondoms,
  getUnits,
  addCondoms,
  deleteCondom,
  getRoles,
  getOrganizations,
  createHotspot,
  getCondomInventory,
  updateCondomItem,
  addCondomInventory,
  deleteCondomInventory,
  getHotspots,
  updateCondomInventory,
  deleteUser,
  deleteHotspot,
  updateUser,
  updateHotspot,
  createOrder,
  getOrders,
  getReceivedOrders,
  updateReceivedOrder,
  getRegions,
  getInventory,
  getDistrictsForRegion,
  getSubCounties,
  getStock,
  getMyOrders,
  getReceivedOrder,
  getDistributions,
  additionToStock,
  distributionToStock,
  editCondom,
  getStockAtOrganization,
  getUserNotifications,
  editNotification,
  getStockAtHotspots
};
