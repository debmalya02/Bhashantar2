import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleSignOut } from "../../utils/auth";
import logo from "../../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import UploadIcon from "@mui/icons-material/Upload";

export default function Sidebar({ companyId, role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="backdrop-blur-sm  bg-white/30 h-screen shadow-xl ">
      <div
        className={`flex flex-col justify-between transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative w-64 h-full z-10`}
      >
        <div className="px-4 py-6">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </div>
          <ul className="mt-16 space-y-3">
            <li>
              <Link
                to="/home"
                className={`block rounded-lg px-4 py-3 text-md font-medium ${
                  isActive("/home")
                    ? "bg-[#e3d2fa] text-gray-700"
                    : "text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"
                }`}
              >
                <HomeIcon className="mr-5" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to={`/company/${companyId}/profile`}
                className={`block rounded-lg px-4 py-3 text-md font-medium ${
                  isActive(`/company/${companyId}/profile`)
                    ? "bg-[#e3d2fa] text-gray-700"
                    : "text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"
                }`}
              >
                <PersonIcon className="mr-5" />
                Profile
              </Link>
            </li>
            {role !== "user" && (
              <>
                <li>
                  <Link
                    to={`/company/${companyId}/userManage`}
                    className={`block rounded-lg px-4 py-3 text-md font-medium ${
                      isActive(`/company/${companyId}/userManage`)
                        ? "bg-[#e3d2fa] text-gray-700"
                        : "text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"
                    }`}
                  >
                    <ManageAccountsIcon className="mr-5" />
                    Manage Users
                  </Link>
                </li>
                {/* <li>
                  <Link to={`/company/${companyId}/roleManage`} className={`block rounded-lg px-4 py-3 text-md font-medium ${isActive(`/company/${companyId}/roleManage`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                    Manage Roles
                  </Link>
                </li>
                <li>
                  <Link to={`/company/${companyId}/permissionManage`} className={`block rounded-lg px-4 py-3 text-md font-medium ${isActive(`/company/${companyId}/permissionManage`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                    Manage Permissions
                  </Link>
                </li> */}
              </>
            )}
            <li>
              <Link
                to={`/company/${companyId}/project`}
                className={`block rounded-lg px-4 py-3 text-md font-medium ${
                  isActive(`/company/${companyId}/project`)
                    ? "bg-[#e3d2fa] text-gray-700"
                    : "text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"
                }`}
              >
                <FolderCopyIcon className="mr-5" />
                Projects
              </Link>
            </li>
            {role === "user" && (
              <li>
                <Link
                  to={`/company/${companyId}/mywork`}
                  className={`block rounded-lg px-4 py-3 text-md font-medium ${
                    isActive(`/company/${companyId}/mywork`)
                      ? "bg-[#e3d2fa] text-gray-700"
                      : "text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"
                  }`}
                >
                  <StorageTwoToneIcon className="mr-5" />
                  My Work
                </Link>
              </li>
            )}
            {role === "superAdmin" && (
              <li>
                <Link
                  to="/register"
                  className={`block rounded-lg px-4 py-3 text-md font-medium ${
                    isActive("/register")
                      ? "bg-[#e3d2fa] text-gray-700"
                      : "text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"
                  }`}
                >
                  Register
                </Link>
              </li>
            )}
            {role !== "user" && (
              <li>
                <Link
                  to={`/company/${companyId}/uploadDocument`}
                  className={`block rounded-lg px-4 py-3 text-md font-medium ${
                    isActive(`/company/${companyId}/uploadDocument`)
                      ? "bg-[#e3d2fa] text-gray-700"
                      : "text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"
                  }`}
                >
                  <UploadIcon className="mr-5" />
                  Upload Document
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={handleSignOut}
                className="w-full rounded-lg px-4 py-4 text-md font-medium text-gray-500 [text-align:_inherit] bg-[#fffff] hover:bg-[#d00000] hover:text-white"
              >
                <LogoutIcon className="mr-5" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:hidden">
        <button className="bg-[#e3d2fa] text-white" onClick={toggleSidebar}>
          Toggle
        </button>
      </div>
    </div>
  );
}
