"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CustomNavbar() {
  const router = useRouter();

  const [userObj, setUserObj] = useState({
    name: "Ankur Sarkar",
    username: "itsaliataie",
    email: "ankur02sarkar@gmail.com",
    image:
      "https://i.pinimg.com/736x/96/91/28/9691288a3fadba6a8e6173d4eea20488.jpg",
    bio: "An aspiring Frontend Developer working with CSS / JavaScript / React",
    facebook: "https://www.facebook.com/Ank.Sar.02",
    insta: "https://www.instagram.com/black_hat.hades/",
    youtube: "https://youtube.com/@ankur02sarkar",
    twitter: "https://twitter.com/ankur02sarkar",
  });
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Next App
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                userObj?.image ||
                "https://i.pinimg.com/736x/96/91/28/9691288a3fadba6a8e6173d4eea20488.jpg"
              }
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {userObj?.name || "Lorem Ipsum"}
            </span>
            <span className="block truncate text-sm font-medium">
              {userObj?.email || "lorem@ipsum.com"}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => router.push("/")}>
            Dashboard
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push("/settings")}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={() => router.push("/login")}>
            Login
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}
