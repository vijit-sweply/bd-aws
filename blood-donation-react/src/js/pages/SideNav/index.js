/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', to: '/admin/dashboard', icon: HomeIcon },
  { name: 'Donors', to: '/admin/donors', icon: UsersIcon },
  { name: 'Blood Requests', to: '/admin/requests', icon: FolderIcon },
  { name: 'Create Donor', to: '/admin/create-donor', icon: CalendarIcon },
  { name: 'Create Blood Request', to: '/admin/create-request', icon: DocumentDuplicateIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const SideNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250); // Initial sidebar width
  const isAuthenticated = !!localStorage.getItem('auth');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  const handleResize = e => {
    const size = e.clientX;
    if (size > 150 && size < 500) { setSidebarWidth(size); }
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleResize, false);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleResize, false);
    }, false);
  };

  return (
    <div className="flex min-h-screen">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5">
                  <div className="flex items-center h-16 shrink-0">
                    <img
                      className="w-auto h-8"
                      src={`${window.location.origin}/images/logo.svg`}
                      alt="Gold Coin"
                    />
                  </div>
                  <nav className="flex flex-col flex-1">
                    <ul className="flex flex-col flex-1 gap-y-7">
                      <li>
                        <ul className="-mx-2 space-y-1">
                          {navigation.map(item => (
                            <li key={item.name}>
                              <Link
                                to={item.to}
                                className={classNames(
                                  item.to === window.location.pathname
                                    ? 'bg-gray-50 text-primary-600'
                                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600',
                                    'h-6 w-6 shrink-0',
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <a
                          href="?#"
                          className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-700 rounded-md group gap-x-3 hover:bg-gray-50 hover:text-primary-600"
                        >
                          <Cog6ToothIcon
                            className="w-6 h-6 text-gray-400 shrink-0 group-hover:text-primary-600"
                            aria-hidden="true"
                          />
                          Settings
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div
        className="flex-none hidden min-w-0 select-none lg:block"
        style={{ flexBasis: `${sidebarWidth - 18}px` }}
      >
        <div
          className="flex lg:flex-col lg:fixed lg:inset-y-0"
          style={{ width: `${sidebarWidth}px` }}
        >
          <div className="flex flex-col px-6 pb-4 bg-white hover:overflow-y-auto grow gap-y-5">
            <div className="flex items-center h-16 shrink-0">
              <img src={`${window.location.origin}/images/logo.svg`} className="h-full p-px" alt="logo" />
            </div>
            <nav className="flex flex-col flex-1">
              <ul className="flex flex-col flex-1 gap-y-7">
                <li>
                  <ul className="-mx-2 space-y-1">
                    {navigation.map(item => (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          className={classNames(
                            item.to === window.location.pathname
                              ? 'bg-gray-50 text-primary-600'
                              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.to === window.location.pathname ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600',
                              'h-6 w-6 shrink-0',
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="?#"
                    className="flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-700 rounded-md group gap-x-3 hover:bg-gray-50 hover:text-primary-600"
                  >
                    <Cog6ToothIcon
                      className="w-6 h-6 text-gray-400 shrink-0 group-hover:text-primary-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div
        id="resizer"
        className="flex-none hidden w-6 border-r border-gray-200 select-none cursor-col-resize hover:bg-primary-600 active:bg-primary-600 lg:block"
        onMouseDown={handleMouseDown}
      />
      <div className="flex-grow min-w-0">
        <div className="sticky top-0 z-40 w-full">
          <div className="flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm gap-x-4 sm:gap-x-6 sm:px-6 lg:px-4 lg:shadow-none">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
            <div className="w-px h-6 bg-gray-200 lg:hidden" aria-hidden="true" />
            <div className="flex self-stretch justify-end flex-1 w-full gap-x-4 lg:gap-x-6">
              <Link to="/logout" className="block mt-4 font-semibold leading-6 text-gray-900 sm:hidden" aria-hidden="true">
                Logout
              </Link>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="hidden lg:flex lg:items-center">
                      <Link to="/logout" className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        Logout
                      </Link>
                    </span>
                  </Menu.Button>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <main className="pb-40">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SideNav;
