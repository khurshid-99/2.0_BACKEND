import React from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../auth/hooks/auth.hook";
import { useSelector } from "react-redux";

const Nav = () => {
  const { handleGetMe } = useAuth();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-[#FBF9F6] px-8 py-4 flex justify-between items-center ">
      <h1>Snitch</h1>
      <div className="flex items-center gap-4 ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `
               text-[1.1rem] font-semibold ${isActive ? "text-[red]" : "text-[black]"}
              `
          }
        >
          Home
        </NavLink>
        {user?.role === "seller" && (
          <NavLink
            to={"/seller/products"}
            className={({ isActive }) =>
              `
               text-[1.1rem] font-semibold ${isActive ? "text-[red]" : "text-[black]"}
              `
            }
          >
            Seller Products
          </NavLink>
        )}
      </div>

      <div>
        {user ? (
          <NavLink
            to={"/cart"}
            className={({ isActive }) =>
              `
               text-[1.1rem] font-semibold ${isActive ? "text-[red]" : "text-[black]"}
              `
            }
          >
            Cart
          </NavLink>
        ) : (
          <div className="flex gap-4 items-center ">
            <Link
              to="/login"
              className="transition-colors hover:text-[#C9A96E]  text-[1.1rem] font-semibold"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="transition-colors hover:text-[#C9A96E]  text-[1.1rem] font-semibold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
