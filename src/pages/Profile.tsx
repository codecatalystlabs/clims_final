import Breadcrumb from '../components/Breadcrumb';
import CoverOne from '../images/cover/cover-01.png';

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  role: string;
  organization_unit_id: string;
  phone_number: string;
  district: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type UserData = {
  token: string;
  user: User;
};

const Profile = () => {
  function getUserDataFromLocalStorage(): UserData | null {
    try {
      const storedData = localStorage.getItem('userData');
      return storedData ? (JSON.parse(storedData) as UserData) : null;
    } catch (error) {
      console.error(
        'Failed to retrieve or parse user data from local storage:',
        error
      );
      return null;
    }
  }

  const userData = getUserDataFromLocalStorage();
  const loggedInUser = userData?.user;

  const getInitials = (firstname: string, lastname: string) => {
    const initials = `${firstname ? firstname[0].toUpperCase() : ''}${
      lastname ? lastname[0].toUpperCase() : ''
    }`;
    return initials;
  };

  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 overflow-hidden rounded-lg border bg-white shadow-lg">
        <div className="relative h-52 md:h-72">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-t-lg object-cover"
          />
        </div>
        <div className="relative px-6 pb-6 pt-16 md:px-8 md:pb-8 md:pt-24">
          <div className="absolute left-1/2 top-0 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-secondary text-3xl font-semibold text-white shadow-lg">
            {getInitials(loggedInUser?.firstname!, loggedInUser?.lastname!)}
          </div>
          {/* <h3 className="text-gray-900 text-xl font-semibold dark:text-white">
            {loggedInUser?.firstname} {loggedInUser?.lastname}
          </h3> */}
          {/* <p className="text-md text-gray-500 dark:text-gray-400 font-medium">
            Ministry of Health
          </p> */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div>
              <p className="text-gray-800 text-lg font-semibold dark:text-white">
                {loggedInUser?.firstname}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Name</p>
            </div>
            <div>
              <p className="text-gray-800 text-lg font-semibold dark:text-white">
                {loggedInUser?.email}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
            </div>
            <div>
              <p className="text-gray-800 text-lg font-semibold dark:text-white">
                {loggedInUser?.role}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Role</p>
            </div>
            <div>
              <p className="text-gray-800 text-lg font-semibold dark:text-white">
                {loggedInUser?.district}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Location
              </p>
            </div>
            <div>
              <p className="text-gray-800 text-lg font-semibold dark:text-white">
                {loggedInUser?.phone_number}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Phone</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Last Updated:{' '}
              {new Date(loggedInUser?.updated_at!).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
