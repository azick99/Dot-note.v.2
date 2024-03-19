import React from 'react'
import { Button } from '../ui/button'
import SingleNavigator from './SingleNavigator'
import Link from 'next/link'
import { HiOutlineLogout } from 'react-icons/hi'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'
import { Menu } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50/90 text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-white/90 h-full border-r z-40 ">
        <div className="flex items-center justify-between h-14 border-b">
          <Link href="/" className="flex items-center pl-5 gap-2">
            <span className=" text-logo bg-black rounded-full w-7 h-7 flex justify-center items-center text-white font-serif font-medium">
              N
            </span>{' '}
            <h1 className="font-bold text-gray-700">Dot note</h1>
          </Link>
          <Button className="mr-5">
            <Menu />
          </Button>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li>
              <Button>Quick Search</Button>
            </li>

            <SingleNavigator />

            <li>
              <LogoutLink className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-transparent text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 transition-all">
                <span className="inline-flex justify-center items-center ml-4 ">
                  <HiOutlineLogout className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate"> 
                  Logout
                </span>
              </LogoutLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
