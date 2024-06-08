import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { href: "/issues", label: "Issues" },
    { href: "/dashboard", label: "Dashboard" },
  ];
  return (
    <nav className="flex border-black border-b-2 mb-5 p-5 h-14 items-center space-x-6">
      <Link href="/">
        <AiFillBug></AiFillBug>
      </Link>
      <ul className="flex space-x-6 items-center">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link className="text-zinc-500 hover:text-zinc-800 transition-colors" href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
