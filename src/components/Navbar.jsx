"use client";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function CustomNavbar() {
  const router = useRouter();
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    const session = localStorage.getItem("userObj");
    setUserObj(JSON.parse(session));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userObj");
    toast.success("User Logged Out");
    router.refresh();
  };

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
            <Avatar alt="User settings" img={userObj?.image || ""} rounded />
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
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}
