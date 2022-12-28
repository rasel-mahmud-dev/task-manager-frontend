import React, {useEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import "./navigation.scss";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSignInAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {RootState} from "../../store";


const Navigation = () => {

    const {auth} = useSelector((state: RootState) => state.authState)


    const navigate = useNavigate();
    const [expandNavigation, setExpandNavigation] = useState(false);

    // const windowScroll = usePageScroll();


    const [openAuthMenu, setOpenAuthMenu] = useState(false);

    const [isNavTransparent, setNavTransparent] = useState(false);

    const header = useRef<HTMLDivElement>(null);
    const location = useLocation();

    function toggleNavigation() {
        setExpandNavigation(!expandNavigation);
    }

    function handleResize() {
        if (window.location.pathname === "/") {
            document.documentElement.style.setProperty("--header-height", 0 + "px");
        } else {
            let h = header.current?.offsetHeight || 0;
            document.documentElement.style.setProperty("--header-height", h + "px");
        }
    }


    // window resize event for set header height
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    function handleScroll() {
        if (window.location.pathname === "/") {
            if (header.current) {
                if (window.scrollY > 200) {
                    setNavTransparent(false)
                } else {
                    setNavTransparent(true)
                }
            }
        } else {
            setNavTransparent(false)
        }

    }

    // page scroll event for set navigate bg
    useEffect(() => {
        handleScroll();
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        handleResize();
        handleScroll()
    }, [location.pathname]);


    function handleLogout() {
        // signOutAction();
    }


    const items = [
        {path: "/", label: "Home"},
        {path: "/my-tasks", label: "My Tasks"},
        {path: "/add-task", label: "Add Task"},
    ];

    function closeAuthDropdown() {
        setOpenAuthMenu(false);
    }


    return (
        <div>
            <div
                ref={header}
                className={`navbar top-0 left-0 fixed shadow-md ${isNavTransparent ? "navbar-transparent" : ""}`}
            >
                <div className="container flex items-center justify-between">
                    <div className="flex pl-4">
                        <Link to="/" className="w-6 md:w-8 py-3 flex items-center gap-x-1">
                            <img src="/task-icons.svg" className="logo" alt=""/>
                            <h1 className="text-primary-900 font-bold whitespace-nowrap">Task Manager</h1>
                        </Link>
                    </div>

                    <FontAwesomeIcon icon={faBars} className="block bar-icon relative sm:hidden text-2xl mr-4"
                                     onClick={toggleNavigation}/>

                    <div className={`flex gap-6 items-center main-nav ${expandNavigation ? "expand" : ""}`}>
                        {items.map((item, i) =>

                            <NavLink key={i}
                                     end={true}
                                     onClick={() => setExpandNavigation(false)}
                                     to={item.path}
                                     className="font-medium text-base"
                            >
                                {item.label}
                            </NavLink>
                        )}


                        <div className="flex-none">
                            {auth ? (
                                <div
                                    className="relative "
                                    onMouseOver={() => setOpenAuthMenu(true)}
                                    onMouseLeave={closeAuthDropdown}
                                    onClick={() => setOpenAuthMenu(!openAuthMenu)}
                                >
                                    <a className=" flex justify-center items-center gap-x-2">

                                        {auth.avatar ? (
                                            <div className="w-6 rounded-full h-6 overflow-hidden">
                                                <img className="w-full" src={auth.avatar} alt=""/>
                                            </div>

                                        ) : (
                                            <FontAwesomeIcon className="" icon={faUser}/>
                                        )}


                                        <h4>{auth.username}</h4>
                                    </a>

                                    <div className={`absolute w-52 card bg-white top-14 left-0 ${openAuthMenu ? "block": "hidden"}`}>
                                        <a className="pt-1 flex items-center border-b-2 border-primary-200/20 pb-2">

                                            <div className="flex flex-col ml-3">
                                                <span className="text-sm font-semibold text-dark-400">{auth.username}</span>
                                            </div>
                                        </a>
                                        <div className="mt-2">
                                            <li className="pt-1 flex items-center gap-x-1 hover:text-primary-500">
                                                {/*<MdSpaceDashboard className="text-xl text-dark-400" />*/}
                                                <Link onClick={closeAuthDropdown} to={`/dashboard`}>
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li
                                                className="pt-1 flex items-center gap-x-1 cursor-pointer hover:text-primary-500"
                                                onClick={handleLogout}
                                            >

                                                Logout
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <NavLink to="/login">
                                    <FontAwesomeIcon icon={faSignInAlt}/>
                                    Login
                                </NavLink>
                            )}
                        </div>


                    </div>
                </div>
            </div>
            <div className="header-height"/>
        </div>
    );
};

export default Navigation;
