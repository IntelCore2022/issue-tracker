'use client'
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const pathname= usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  return (
    <nav className="flex border-black border-b-2 mb-5 p-5 h-14 items-center space-x-6 relative">
      <Link href="/">
        <AiFillBug></AiFillBug>
      </Link>
      <ul className="flex space-x-6 items-center">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              className={classNames({
                "text-zinc-900" : pathname === href,
                "text-zinc-500" : pathname !== href,
                "hover:text-zinc-800 transition-colors duration-200 ease-in-out" : true,
              })}
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
