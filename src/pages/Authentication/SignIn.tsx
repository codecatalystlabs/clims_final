import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  displaySuccessMessage,
  displayErrorMessage,
} from '../../components/toast/Toast';
import { loginUser } from '../../api/apiRequests';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa6';

const SignIn = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange =
    (setState: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    };

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['login'], data);
      queryClient.invalidateQueries(['login'], { exact: true });
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('location', data.user.location);
      localStorage.setItem('id', data.user.id);
      if (data.code == '401') {
        displayErrorMessage(`${data.message}`);
      }
      if (data.code == '200' && data.user.role === 'hotspot manager') {
        navigate('/focaldashboardh');
        const userData = {
          token: data.token,
          user: data.user,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        displaySuccessMessage('Login successful');
      }

      if (data.code == '200' && data.user.role === 'moh') {
        navigate('/moh');
        const userData = {
          token: data.token,
          user: data.user,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        displaySuccessMessage('Login successful');
      }

      if (data.code == '200' && data.user.role === 'admin') {
        navigate('/adminModule/admin/usermanagment');
        const userData = {
          token: data.token,
          user: data.user,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        displaySuccessMessage('Login successful');
      }

      if (data.code == '200' && data.user.role === 'dfcp') {
        navigate('/focaldashboard');
        const userData = {
          token: data.token,
          user: data.user,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        displaySuccessMessage('Login successful');
      }

      if (data.code == '200' && data.user.role === 'nms') {
        navigate('/nms/dashboard');
        const userData = {
          token: data.token,
          user: data.user,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        displaySuccessMessage('Login successful');
      }

      if (data.code == '200' && data.user.role === 'jms') {
        navigate('/jms');
        const userData = {
          token: data.token,
          user: data.user,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        displaySuccessMessage('Login successful');
      }

      if (data.code == '200' && data.user.role === 'healthy facility') {
        navigate('/hf');
        const userData = {
          token: data.token,
          user: data.user,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        displaySuccessMessage('Login successful');
      }
    },
  });

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPostMutation.mutate({
      username,
      password,
    });
  };

  return (
    <>
      <div
        className=" relative  h-screen  "
        style={{
          backgroundImage: "url('signin.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#006D5B]/50 backdrop-blur-sm">
          <div className="xl:w-[70%] w-[90%] lg:w-[75%] xl:h-[75%] lg:h-[75%]  rounded-md shadow-2xl bg-black-2/50  py-4  backdrop-blur-md dark:border-strokedark dark:bg-boxdark  ">
            <div className=" grid xl:grid-cols-2 lg:grid-cols-2  w-full h-full ">
              <div className="flex  items-center justify-center p-4 ">
                <div className="  text-center grid grid-cols-1 place-items-center  p-4 ">
                  <Link className=" inline-block" to="/">
                    <h3 className="text-3xl text-center font-extrabold text-white ">
                      Last Mile Condom Distribution
                    </h3>
                  </Link>
                  <span className="hidden md:inline-block  mt-6">
                    <img src="logo.png" alt="photo" className="h-full w-full" />
                  </span>
                </div>
              </div>

              <div className="  h-full flex items-center border-l-[1px]  border-white/20   dark:border-strokedark  ">
                <div className="w-full  p-4 sm:p-12.5 xl:p-17.5">
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-4">
                      <label className="mb-2.5 block font-bold text-white dark:text-white">
                        User Name
                      </label>
                      <div className="relative">
                        <input
                          type="name"
                          placeholder="Enter username"
                          onChange={handleChange(setUserName)}
                          className="w-full rounded-lg border border-stroke  py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark "
                        />

                        <span className="absolute right-4 top-4">
                          <svg
                            className="fill-current"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.5">
                              <path
                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 block font-bold text-white dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          onChange={handleChange(setPassword)}
                          className="w-full rounded-lg border border-stroke bg-white py-4 pl-6 pr-10 outline-none focus:border-[#006D5B] focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />

                        <span className="absolute right-4 top-4">
                          {showPassword ? (
                            <FaEyeSlash
                              onClick={handleShowPassword}
                              size={27}
                            />
                          ) : (
                            <IoEyeSharp
                              onClick={handleShowPassword}
                              size={27}
                            />
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8   ">
                      <input
                        type="submit"
                        value={
                          createPostMutation.isLoading ? 'loading...' : 'login'
                        }
                        className="w-full shadow-2xl cursor-pointer rounded-lg bg-[#006D5B] border-[1px] border-white/50 backdrop-blur-md  p-4 text-white transition hover:bg-opacity-90"
                      />
                    </div>

                    {/* <div className="mt-8 text-center text-white">
                      <p>
                        Forgot password?{' '}
                        <Link to="#" className=" underline text-black">
                          reset
                        </Link>
                      </p>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
