//@ts-nocheck
import { useQuery } from '@tanstack/react-query';
import FolderCard from '../../components/FolderCard';
import { getStockAtOrganization } from '../../api/apiRequests';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FoldersPage = () => {
  const [info, setInfo] = useLocalStorage('userData', {});
  const [data, setData] = useState([]);

  const newCondomInventoryQuery = useQuery({
    queryKey: ['newInventory'],
    queryFn: () => getStockAtOrganization(info?.user.organization_unit_id),
  });

  useEffect(() => {
    if (newCondomInventoryQuery.isSuccess) {
      setData(newCondomInventoryQuery.data);
    }
  }, [newCondomInventoryQuery.isSuccess, newCondomInventoryQuery.data]);

  const allEvidences = data.flatMap((item) =>
    item.stock_registrations.flatMap((registration) => registration.evidences)
  );

  const distributioEvidence = data.flatMap((item) =>
    item.distributions.flatMap((distribution) => distribution.evidences)
  );

  const serializedEvidences = encodeURIComponent(JSON.stringify(allEvidences));
  const serializedDistributionEvidences = encodeURIComponent(
    JSON.stringify(distributioEvidence)
  );

  return (
    <div>
      <h2 className="p-[1rem] text-lg font-extrabold capitalize text-black-2">
        Documents Management (Codom stock eveidence records)
      </h2>
      <div className="flex h-full w-full items-center  justify-start space-x-6  p-2">
        <div className="hover:bg-black hover:bg-opacity-10">
          <Link to={`/files?evidences=${serializedEvidences}`}>
            <FolderCard name="Condom Stock Files" id="1" />
          </Link>
        </div>
        <div className="hover:bg-black hover:bg-opacity-10">
          <Link to={`/files?evidences=${serializedDistributionEvidences}`}>
            <FolderCard name="Condom Distributions Files" id="2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoldersPage;
