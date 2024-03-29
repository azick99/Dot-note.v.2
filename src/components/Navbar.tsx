import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import Sidebar from './sidebar/Sidebar'

export default async function Navbar() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const content = (
    <div className="sticky h-14  top-0 z-30 w-full border-b-gray-200 bg-white/70 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 ">
          <Link href="/" className="flex items-center pl-5 gap-2">
            <span className=" text-logo bg-black rounded-full w-7 h-7 flex justify-center items-center text-white font-serif font-medium">
              N
            </span>{' '}
            <h1 className="font-bold text-gray-700">Dot note</h1>
          </Link>
          {/* todo: add mobile navbar */}
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="/pricing"
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                Pricing
              </Link>

              {user !== null ? (
                <>
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                  >
                    Dashboard
                  </Link>
                  <LogoutLink
                    className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                  >
                    Log out
                  </LogoutLink>
                </>
              ) : (
                <LoginLink
                  className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                >
                  Sign in
                </LoginLink>
              )}

              <RegisterLink className={buttonVariants({ size: 'sm' })}>
                Get started
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )

  return <nav>{user !== null ? <Sidebar /> : content} </nav>
}
