import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'

import { currentUser } from '@clerk/nextjs/server'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'

export default async function Navbar() {
  const user = await currentUser()
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex items-center pl-5 gap-2">
            <span className=" text-logo bg-black rounded-full w-7 h-7 flex justify-center items-center text-white font-serif font-medium">
              N
            </span>{' '}
            <h1 className="font-bold text-gray-700">Dot note</h1>
          </Link>

          <div className="flex items-center space-x-4 ">
            {!user ? (
              <>
                <SignedOut>
                  <SignInButton forceRedirectUrl="/dashboard">
                    <span
                      className={buttonVariants({
                        variant: 'ghost',
                        size: 'sm',
                        className: 'cursor-pointer',
                      })}
                    >
                      Sign in
                    </span>
                  </SignInButton>
                  <SignUpButton forceRedirectUrl="/dashboard">
                    <span
                      className={buttonVariants({
                        size: 'sm',
                        className: 'cursor-pointer',
                      })}
                    >
                      Sign up
                    </span>
                  </SignUpButton>
                </SignedOut>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}
                >
                  Dashboard
                </Link>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
