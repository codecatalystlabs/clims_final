import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import CondomDashboard from './pages/MOH/CondomManagment';
import AdminDashboard from './pages/MOH/AdminDashboard';
import CondomInventory from './pages/MOH/CondomInventory';
import HotspotDashboard from './pages/MOH/HotspotManagement';

import FocalPerson from './pages/DCFP/FocalPerson';
import HotSpotView from './pages/DCFP/HotSpotView';
import CondomMgt from './pages/DCFP/CondomMgt';
import MyOrders from './pages/DCFP/MyOrders';
import CondomUploadEvidence from './pages/DCFP/CondomUploadEvidence';

import FocalPersonH from './pages/Hotspot-Manager/FocalPersonH';
import CondomMgtH from './pages/Hotspot-Manager/CondomMgtH';
import MyOrdersH from './pages/Hotspot-Manager/MyOrdersH';
import CondomUploadEvidenceH from './pages/Hotspot-Manager/CondomUploadEvidenceH';
import DeliveryHome from './pages/Delivery-Agent/DeliveryHome';

import Dashboard from './pages/storeInCharge/Dashboard';
// import DashboardJms from './pages/JMS Duplicate/Dashboard/Dashboard';
import AgentsUI from './pages/JMS Duplicate/Dashboard/AgentsUI';
import Collapsible from './pages/JMS Duplicate/Collapsible';
import DataGridTable from './pages/datagrid/DataGridTable';
import CondomsMOH from './pages/MOH/CondomMgt/CondomsMOH';
import Condoms from './pages/NMS/Condoms/Condoms';
import Orders from './pages/NMS/Orders/Orders';
import CondomJMS from './pages/JMS/Condoms/Condoms';
import OrdersJMS from './pages/JMS/Orders/Orders';
import Procured from './pages/MOH/Procured';
import DashboardNMS from './pages/NMS/Dashboard/DashboardNMS';
import DashboardJMS from './pages/JMS/Dashboard/DashboardJMS';
import DashboardOther from './pages/Others/Dashboard/DashboardOther';
import RecordTextOther from './pages/Others/Record/RecordTextOther';
import StatusOther from './pages/Others/Orders/StatusOther';
import CustomMap from './pages/Hotspot-Manager/CustomMap';
import AdminModuleDashboard from './pages/ADMIN/Dashboard/Dashboard';
import HealthDashboard from './pages/HealthFacility/Dashboard/Dashboard';
import Ordershf from './pages/HealthFacility/Orders/Ordershf';
import CondomsADMIN from './pages/ADMIN/CondomMgt/CondomsADMIN';
import ProcuredADMIN from './pages/ADMIN/ProcuredADMIN';
import AdminDashboardADMIN from './pages/ADMIN/AdminDashboard';
import Distributions from './pages/DCFP/Distributions';
import Reports from './pages/HealthFacility/Reports';
import CondomStock from './pages/HealthFacility/CondomStock/CondomStock';
import CondomStockJMS from './pages/JMS/Condom Invetory/CondomStock';
import HotspotMgt from './pages/MOH/Dashboard/HotspotMgt';
import Profile from './pages/Profile';
import FoldersPage from './pages/DocumentManagment/FolderPage';
import Files from './pages/DocumentManagment/Files';
import LoginRefined from './pages/Authentication/LoginRefined';
import { ProtectedRoute } from './ProtectedRoute';
import Stock from './pages/MOH/Dashboard/Stock';
import NotFound from './pages/Not-Found';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const MohDashboard = lazy(() => import('./pages/MOH/Dashboard/Dashboard'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
  <Suspense  fallback={<Loader />}>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/login" element={<LoginRefined />} />

        <Route element={<DefaultLayout />}>
          <Route path="/condom/managment" element={<CondomDashboard />} />
          <Route path="/condom/managmenth" element={<CondomMgt />} />
          <Route path="/condom/stock" element={<CondomInventory />} />
          <Route path="/condom/stockh" element={<CondomInventory />} />
          <Route path="/focaldashboardh" element={<FocalPersonH />} />
          {/* <Route path="/moh" element={<MohDashboard />} /> */}
          <Route path="/adminModule" element={<AdminModuleDashboard />} />
          {/* DISTRICT CONDOM FOCAL PERSON ROUTES START */}
          <Route path="/hotspotview" element={<HotSpotView />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/focaldashboard" element={<HealthDashboard />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dfcp/orders" element={<Ordershf />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dfcp/condom/stock" element={<CondomStock />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/district/hotspots" element={<HotspotDashboard />} />
          </Route>
          
          {/* DISTRICT CONDOM FOCAL PERSON ROUTES END */}
          <Route path="/hf/reports" element={<Reports />} />
          <Route path="/moh/admin/userManagment" element={<AdminDashboard />} />
          <Route
            path="/adminModule/admin/usermanagment"
            element={<AdminDashboardADMIN />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/condom/dfcp" element={<CondomMgt />} />
          <Route path="/condom/dfcph" element={<CondomMgtH />} />
          <Route path="/condom/orders" element={<MyOrders />} />
          <Route path="/condom/distributions" element={<Distributions />} />

          {/* MOH ROUTES START */}
          <Route element={<ProtectedRoute />}>
            <Route path="/moh" element={<MohDashboard/>} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/allStock" element={<Stock/>} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/moh/hotspot" element={<HotspotMgt/>} />
          </Route>


          {/* DOCUMENT MANAGEMENT ROUTES START */}
          <Route element={<ProtectedRoute />}>
            <Route path="/files" element={<Files />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/document/management" element={<FoldersPage />} />
          </Route>
         {/* DOCUMENT MANAGEMENT ROUTES END */}
          {/* <Route
            path="/dfcp/condom/evidence"
            element={<CondomUploadEvidence />}
          /> */}
          {/* <Route path="/storeincharge" element={<Dashboard />} /> */}
          {/* <Route path="/jms" element={<DashboardJms />} /> */}
          <Route path="/jms/agentui" element={<AgentsUI />} />
          <Route path="/other/condom" element={<DataGridTable />} />
          <Route path="/jms/mgt/condom" element={<Collapsible />} />
          <Route path="/moh/condomsmoh" element={<CondomsMOH />} />
          <Route
            path="/adminModule/condomsadminModule"
            element={<CondomsADMIN />}
          />
          <Route path="/delivery/home" element={<DeliveryHome />} />
          <Route path="/nms/condoms" element={<Condoms />} />
          <Route path="/nms/orders" element={<Orders />} />
          <Route path="/moh/procured" element={<Procured />} />
          <Route path="/adminModule/procured" element={<ProcuredADMIN />} />
          <Route path="/nms/dashboard" element={<DashboardNMS />} />
          {/* JMS ROUTES START */}
          <Route element={<ProtectedRoute />}>
            <Route path="/jms" element={<DashboardJMS />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/jms/orders" element={<OrdersJMS />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/item/condoms" element={<CondomJMS />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/jms/condoms/stock" element={<CondomStockJMS />} />
          </Route>
          {/* JMS ROUTES END */}


          <Route path="/others/dashboard" element={<DashboardOther />} />
          <Route path="/others/status" element={<StatusOther />} />
          <Route path="/others/record" element={<RecordTextOther />} />



          <Route element={<ProtectedRoute />}>
            <Route path="/hotspots/map" element={<CustomMap />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
      </Suspense>
  )  
}

export default App;
