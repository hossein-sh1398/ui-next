"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  async function handleLogout() {
    const res = await logout();
    if (res?.status === "success") {
      setLoginUser("");
      router.push("/");
    }
  }
  const { user, setLoginUser } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" href="/">
        به سایت من خوش آمدید
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            {user && (
              <Link href="/profile" className="nav-link">
                پروفایل من
              </Link>
            )}
            {!user && (
              <Link href="/auth/login" className="nav-link">
                ورود/عضویت
              </Link>
            )}
          </li>
          {user && (
            <li className="nav-item">
              <a onClick={handleLogout} className="nav-link px-3" href="#">
                خروج
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
