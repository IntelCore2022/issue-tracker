// ProfileDropdown.js
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

export const ProfileDrop = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAccountSettings = () => {
    console.log("Navigating to account settings...");
    // Implement logic for account settings
  };

  const handleLogout = async () => {
    console.log("Logging out...");
    const response = await fetch("/api/user/logout", { method: "POST" });
    const data = await response.json();
    if (data.status === 200) {
      console.log("Logged out successfully");
      window.location.reload();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === 200) {
        console.log("User found:", data.user);
        setUser(data.user);
      } else {
        console.error("Failed to fetch user:", data.error);
      }
    };

    fetchUser();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-2 inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex items-center focus:outline-none"
          onClick={toggleDropdown}
        >
          <div className="w-7 h-7 mt-[-0.4rem] bg-black rounded-full">
            <Image
              alt="Profile"
              src="/profile.jpeg"
              width={28}
              height={28}
              className="rounded-full"
            />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {user ? (
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                role="menuitem"
                onClick={() => router.push('/auth/signup')}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
