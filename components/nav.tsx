import React, { useState, useRef } from 'react'
import useOnClickOutside from '../utils/clickOutside'
// import styles from './nav.css'

// interface Setter {
//   setter: (value: boolean) => void;
// }

// interface OpenState {
//   open: boolean;
//   setter: (value: boolean) => void;
// }

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

// const activeItem = "text-gray-900 bg-gray-200";
// const passiveItem = "bg-transparent";

const MainItems = (): JSX.Element => (
  <>
    {mainItems.map((item) => (
      <a
        className="px-4 py-2 mt-2 md:mt-0 text-sm font-semibold rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring md:ml-4"
        href={item.link}
        key={`main-items-${item.name}`}
      >
        {item.name}
      </a>
    ))}
  </>
)

const DropdownItems = (): JSX.Element => (
  <div className="px-2 py-2 bg-white rounded-md shadow">
    {dropdownItems.map((item) => (
      <a
        className="block px-4 py-2 mt-2 md:mt-0 text-sm font-semibold rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring"
        href={item.link}
        key={`dropdown-items-${item.name}`}
      >
        {item.name}
      </a>
    ))}
  </div>
)

export const Nav = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const ref = useRef(null)

  const handleClickOutside = (): void => {
    setOpen(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <div ref={ref} className="w-full text-gray-700 bg-white">
      <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="p-4 flex flex-row items-center justify-between">
          <a
            href="#"
            className="text-lg font-semibold tracking-widest text-gray-900 rounded-lg focus:outline-none focus:ring"
          >
            ЕДДС
          </a>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:ring"
            onClick={() => setOpen(!open)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path
                className={open ? 'hidden' : ''}
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
              <path
                className={open ? '' : 'hidden'}
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <nav
          className={`${
            open ? 'flex' : 'hidden'
          } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
        >
          <MainItems />
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-row items-center w-full px-4 py-2 mt-2 md:mt-0 text-sm font-semibold rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring text-left md:w-auto md:inline md:ml-4"
            >
              <span>Справочники</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className={`${
                  open ? 'rotate-180' : 'rotate-0'
                } inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              x-transitionEnter="transition ease-out duration-100"
              x-transitionEnter-start="transform opacity-0 scale-95"
              x-transitionEnter-end="transform opacity-100 scale-100"
              x-transitionLeave="transition ease-in duration-75"
              x-transitionLeave-start="transform opacity-100 scale-100"
              x-transitionLeave-end="transform opacity-0 scale-95"
              className={`${
                open ? '' : 'hidden'
              } absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48`}
            >
              <DropdownItems />
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex flex-row items-center w-full px-4 py-2 mt-2 md:mt-0 text-sm font-semibold rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring text-left md:w-auto md:inline md:ml-4"
            >
              <span>Меню</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className={`${
                  openMenu ? 'rotate-180' : 'rotate-0'
                } inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
