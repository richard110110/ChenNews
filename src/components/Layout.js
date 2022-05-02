import React, { useState } from "react";
import Sidebar from "./SideBar";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
function Layout(props) {
  const [showSideBar, setShowSideBar] = useState(true);
  return (
    <div className="layout flex w-full h-full">
      <div className="sidebar">
        <Sidebar showSideBar={showSideBar} />
      </div>
      <div className="w-full h-full">
        <div className="header bg-primary h-20 w-full flex items-center justify-between">
          <HiOutlineMenuAlt1
            onClick={() => setShowSideBar(!showSideBar)}
            color="gray"
            size={30}
            className="cursor-pointer"
          />
          <div className="mr-5 text-gray-300 flex items-center space-x-2">
            <FaRegUserCircle />
            <span>
              {JSON.parse(
                localStorage.getItem("ChenNew-user")
              ).name.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="content max-h-[85vh] overflow-y-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
