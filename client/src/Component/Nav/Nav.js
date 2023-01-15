import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../constants/constants";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import decode from "jwt-decode";

import "./Nav.css";

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [navActive, setNavActive] = useState(false);
    const [searchState, setSearchState] = useState("");
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );
    const [searchActive, setSearchActive] = useState(false);
    const [mobileActive, setMobileActive] = useState(false);

    const handleSignOut = () => {
        dispatch({ type: LOGOUT });

        navigate("/");

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) handleSignOut();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    function changeNavbar() {
        if (window.scrollY > 70) {
            setNavActive(true);
        } else {
            setNavActive(false);
        }
    }

    window.addEventListener("scroll", changeNavbar);

    const seacrhSubmit = (e) => {
        e.preventDefault();

        navigate("/", { state: { searchState } });
    };

    return (
        <div className="navbar">
            <div
                className="nav-burger"
                onClick={() => setMobileActive((e) => !e)}
            >
                {mobileActive ? <HiOutlineX /> : <HiMenuAlt3 />}
            </div>

            <div
                className={`nav-search ${searchActive && "nav-search-active"}`}
            >
                <div className="nav-form">
                    <form onSubmit={seacrhSubmit}>
                        <label for="search">
                            <div
                                className="nav-icon"
                                onClick={() => setSearchActive((e) => !e)}
                            ></div>
                        </label>
                        <input
                            id="search"
                            className={searchActive ? "nav-input" : "invicible"}
                            type={"text"}
                            placeholder="Search..."
                            onChange={(e) => setSearchState(e.target.value)}
                            value={searchState}
                            maxLength="16"
                        />
                    </form>
                </div>
                <span
                    className={searchActive ? "nav-search-clear" : "invicible"}
                    onClick={() => setSearchState("")}
                ></span>
            </div>

            <div
                className={
                    navActive
                        ? `nav-container ${
                              mobileActive
                                  ? "nav-mobile-active nav-mobile-active-fixed"
                                  : "nav-active"
                          }`
                        : `nav-container ${
                              mobileActive &&
                              "nav-mobile-active nav-mobile-active-fixed"
                          }`
                }
            >
                <ul className={`nav ${mobileActive && "nav-mobile-active"}`}>
                    <li>
                        <Link
                            to={"/"}
                            onClick={() => setMobileActive((e) => !e)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        {user ? (
                            <Link
                                to={"/"}
                                className="signout"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </Link>
                        ) : (
                            <Link to={"/auth"}>Sign In</Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Nav;
