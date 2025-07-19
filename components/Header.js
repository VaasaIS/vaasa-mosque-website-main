import { MenuAlt3Icon, XIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import VisLogo from '../assets/vis-logo.svg'

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [toggleMenu])

  return (
    <header className="shadow-black-900/20 mx-auto flex items-center justify-between bg-secondary px-5 py-3 shadow-md md:px-10">
      <a href="/" className="hidden lg:block">
        <Image
          src={VisLogo}
          alt="vaasa islamic society logo"
          width={260}
          height={50}
          objectFit="contain"
        />
      </a>
      <a href="/" className="lg:hidden">
        <Image
          src={VisLogo}
          alt="vaasa islamic society logo"
          width={220}
          height={35}
          objectFit="contain"
        />
      </a>
      <nav className="justtify-center flex items-center">
        <ul className="hidden items-center justify-center space-x-10 text-lg text-primary md:flex">
          <li className="md:hidden lg:inline-flex">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="md:hidden lg:inline-flex">
            <Link href="/info-events">
              <a>Info &amp; Events</a>
            </Link>
          </li>
          <li className="md:hidden lg:inline-flex">
            <Link href="/about-us">
              <a>About</a>
            </Link>
          </li>
          <li className="md:hidden lg:inline-flex">
            <Link href="/contact-us">
              <a>Contact</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/donate">
              <a className="btn">Donate</a>
            </Link>
          </li> */}
        </ul>

        <button
          className="hamburger block hover:translate-y-1 focus:outline md:ml-5 lg:ml-0 lg:hidden"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          {toggleMenu ? (
            <XIcon className="h-8" />
          ) : (
            <MenuAlt3Icon className="h-8" />
          )}
        </button>

        <div className="z-50 h-full bg-red-200 lg:hidden">
          <div
            className={`z-60 fixed inset-0 top-[4rem] h-full bg-ascent ${
              toggleMenu ? 'flex' : 'hidden'
            }`}
          ></div>
          <ul
            className={`fixed left-6 right-6 mt-10 h-[100vh] flex-col items-center space-y-6 self-end bg-white py-8 font-bold drop-shadow-md sm:w-auto sm:self-center ${
              toggleMenu ? 'flex' : 'hidden'
            }`}
          >
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about-us">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/info-events">
                <a>Info & Events</a>
              </Link>
            </li>
            <li>
              <Link href="/contact-us">
                <a>Contact</a>
              </Link>
            </li>
            {/* <li>
              <Link href="/donate">
                <a className="btn">Donate</a>
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
