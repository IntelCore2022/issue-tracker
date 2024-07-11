'use client'
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { ProfileDrop } from "./components/ProfileDrop";

const NavBar = () => {
  const pathname= usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  return (
    <nav className="flex border-black border-b-2 p-5 h-14 justify-between items-center space-x-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
      <Link href="/">
        <AiFillBug></AiFillBug>
      </Link>
      <div>
      <ul className="flex space-x-6 items-center">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              className={classNames({
                "text-yellow-50" : pathname === href,
                "text-black" : pathname !== href,
                "hover:text-zinc-400 transition-colors duration-200 ease-in-out" : true,
              })}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      </div>
      <ProfileDrop></ProfileDrop>
    </nav>
  );
};

export default NavBar;
