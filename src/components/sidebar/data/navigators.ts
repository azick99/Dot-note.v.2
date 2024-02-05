import { HiOutlineHome, HiOutlineClock } from 'react-icons/hi'
import { HiOutlineFolder } from 'react-icons/hi2'
import { LuSettings2 } from 'react-icons/lu'
import { IconType } from 'react-icons/lib'

export type Navigator = {
  id: number
  title: string
  path?: string
  icon: IconType
}

const navigators: Navigator[] = [
  {
    id: 0,
    title: 'Dashobard',
    path: '/dashboard',
    icon: HiOutlineHome,
  },
  {
    id: 1,
    title: 'Updates',
    path: '/updates',
    icon: HiOutlineClock,
  },
  {
    id: 2,
    title: 'Settings',
    path: '/settings',
    icon: LuSettings2,
  },
  {
    id: 3,
    title: 'Projects',
    icon: HiOutlineFolder,
  },
]

export default navigators
