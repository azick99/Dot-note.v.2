import Link from 'next/link'
import navigators, { Navigator } from './data/navigators'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'

const ProjectsDropdown = ({ navigator }: { navigator: Navigator }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="relative flex rounded-none flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 font-normal"
      >
        <span className="inline-flex justify-center items-center ">
          <navigator.icon className="w-5 h-5" />
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">
          {navigator.title}
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default function SingleNavigator() {
  return (
    <>
      {navigators.map((navigator) => {
        const { id, title, path } = navigator

        return (
          <li key={id}>
            {path ? (
              <Link
                href={path}
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <navigator.icon className="w-5 h-5" />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  {title}
                </span>
              </Link>
            ) : (
              <ProjectsDropdown navigator={navigator} />
            )}
          </li>
        )
      })}
    </>
  )
}


