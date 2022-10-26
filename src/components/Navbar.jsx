import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { IoSearchCircle, IoCloseCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { searchMovie } from "../store/reducers/movieReducer";

const Navbar = (props) => {
  const { user, logOut } = UserAuth();
  const [search, setSearch] = useState("");
  const [onBlur, setOnBlur] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(user.email)

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const closeSearch = () => {
    setSearch("");
    setOnBlur(!onBlur);
    navigate("/");
  };

  const handleSearch = () => {
    dispatch(
      searchMovie({
        fetchURL: "search/movie",
        params: { query: search?.toLowerCase(), page: 1 },
      })
    );
    navigate({pathname: "/movie/search", search: `?query=${search?.toLowerCase()}`})
  }

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full fixed">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETFLIX
        </h1>
      </Link>
      <div className="flex flex-row gap-x-2 items-center w-6/12 justify-end">
        <div className={`relative ${onBlur && `w-full`}`}>
          {onBlur && (
            <>
              <input
                className="h-7 w-full rounded-full pl-4 pr-6 align-middle opacity-50 bg-slate-800 text-white"
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyPress={(event) => {
                  event.key === "Enter" && handleSearch();
                }}
                autoFocus
              />
              <IoCloseCircle
                onClick={() => closeSearch()}
                className="absolute cursor-pointer top-1/2 right-2 transform -translate-y-1/2 text-white text-2xl hover:text-red-600 z-10"
              />
            </>
          )}
          {!onBlur &&
            location.pathname !== "/login" &&
            location.pathname !== "/signup" && (
              <IoSearchCircle
                onClick={() => setOnBlur(!onBlur)}
                className="absolute cursor-pointer top-1/2 right-2 transform -translate-y-1/2 text-white text-2xl hover:text-red-600 z-10"
              />
            )}
        </div>
        {!onBlur &&
          (user?.email ? (
            <div>
              <Link to="/account">
                <button className="text-white pr-4">Account</button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="text-white pr-4">Sign In</button>
              </Link>
              <Link to="/signup">
                <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
                  Sign Up
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
