import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

import useOnClickOutside from '../utils/clickOutside';

interface Page {
  path: string
  isMobile?: boolean
}

const mainItems = [
  { link: '/contacts', name: 'Контакты' },
  { link: '/companies', name: 'Организации' },
  { link: '/sirens', name: 'Сирены' },
]

const dropdownItems = [
  { link: '/departments', name: 'Отделы' },
  { link: '/educations', name: 'Обучение' },
  { link: '/kinds', name: 'Типы тренировок' },
  { link: '/posts', name: 'Должности' },
  { link: '/practices', name: 'Учения' },
  { link: '/ranks', name: 'Чины' },
  { link: '/scopes', name: 'Сферы' },
  { link: '/certificates', name: 'Удостоверения' },
  { link: '/sirentypes', name: 'Типы сирен' },
]

const navItem = (current: boolean, isMobile: boolean): string =>
  current
    ? `text-white hover:bg-gray-700 ${
        isMobile ? 'block' : 'border-b-2 border-blue-500'
      } px-3 py-2 text-sm font-medium`
    : `text-gray-300 hover:bg-gray-700 hover:text-white ${
        isMobile ? 'block' : ''
      } px-3 py-2 text-sm font-medium`

const MainItems = (page: Page): JSX.Element => (
  <>
    {mainItems.map((item) => (
      <a
        href={item.link}
        key={`main-items-${item.name}`}
        className={navItem(page.path === item.link, page.isMobile || false)}
        aria-current="page"
      >
        {item.name}
      </a>
    ))}
  </>
)

const MobileItems = (page: Page): JSX.Element => (
  <>
    {mainItems.concat(dropdownItems).map((item) => (
      <a
        href={item.link}
        key={`main-items-${item.name}`}
        className={navItem(page.path === item.link, page.isMobile || false)}
        aria-current="page"
      >
        {item.name}
      </a>
    ))}
  </>
)

const DropdownItems = (): JSX.Element => (
  <>
    {dropdownItems.map((item) => (
      <a
        href={item.link}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        key={`dropdown-items-${item.name}`}
      >
        {item.name}
      </a>
    ))}
  </>
)

export const Header = (): JSX.Element => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [directoryOpen, setDirectoryOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const profileRef = useRef(null)
  const directoryRef = useRef(null)
  const { asPath } = useRouter()

  const handleClickOutsideProfile = (): void => {
    setProfileOpen(false)
  }
  const handleClickOutsideDirectory = (): void => {
    setDirectoryOpen(false)
  }

  useOnClickOutside(profileRef, handleClickOutsideProfile)
  useOnClickOutside(directoryRef, handleClickOutsideDirectory)

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {/* <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
                <svg
                  className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          --> */}
                <svg
                  className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div
                className={`${
                  asPath === '/' ? 'border-b-2 border-blue-500' : ''
                } flex-shrink-0 flex items-center`}
              >
                <Link href="/">
                  <a className="block h-8 w-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-9 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  </a>
                </Link>
                {/* <img
                  className="hidden lg:block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                /> */}
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <MainItems path={asPath} />
                </div>
              </div>

              <div className="hidden sm:block sm:ml-6">
                <div className="flex -space-x-10">
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-current="page"
                    onClick={() => setDirectoryOpen(!directoryOpen)}
                  >
                    Справочники
                  </a>
                  <div
                    className={`${
                      directoryOpen ? '' : 'hidden'
                    } absolute mt-11 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <DropdownItems />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                {/* <!-- Heroicon name: outline/bell --> */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* <!-- Profile dropdown --> */}
              <div className="ml-3 relative" ref={profileRef}>
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    {/* <Image
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}
                  </button>
                </div>

                {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
                <div
                  className={`${
                    profileOpen ? '' : 'hidden'
                  } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${mobileMenuOpen ? '' : 'hidden'} sm:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileItems path={asPath} isMobile />
          </div>
        </div>
      </nav>
    </>
  )
}
