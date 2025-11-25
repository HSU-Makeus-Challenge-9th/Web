import { useState, useEffect } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import { authAPI } from "../apis/apis";
import ProfileSettingsModal from "./ProfileSettingsModal";
import type { UserProfile } from "../apis/profile";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const accessToken = localStorage.getItem("accessToken");

    if (storedName && accessToken) {
      setUserName(storedName);
      setIsLoggedIn(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await authAPI.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      setUserName("");
      navigate("/login");
    }
  };
  const handleProfileOpen = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserName(profile.name);
    setIsProfileModalOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-40 h-16">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 h-full">
          <div className="flex items-center space-x-3">
            <button onClick={toggleSidebar} className="shrink-0">
              <FaBars className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-pink-500 text-xl sm:text-2xl font-bold hover:text-pink-400 transition cursor-pointer"
            >
              DOLIGO
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-6">
            {isLoggedIn ? (
              <>
                <div className="hidden sm:flex items-center space-x-2">
                  <FaSearch className="text-white" />
                  <button
                    type="button"
                    onClick={handleProfileOpen}
                    className="text-sm sm:text-base text-left text-white transition hover:text-pink-400 focus:outline-none"
                  >
                    {userName}님 환영합니다
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="border border-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-pink-500 hover:text-black hover:border-pink-500 transition text-sm sm:text-base"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="border border-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-pink-500 hover:text-black hover:border-pink-500 transition text-sm sm:text-base"
                >
                  로그인
                </button>
                <button
                  onClick={handleSignUpClick}
                  className="bg-pink-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-pink-600 transition text-sm sm:text-base"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onRequestDelete={() => {
          window.dispatchEvent(new CustomEvent("open-delete-account-modal"));
          closeSidebar();
        }}
      />
      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={handleProfileClose}
        onSuccess={handleProfileUpdate}
      />
    </>
  );
};

export default Header;
