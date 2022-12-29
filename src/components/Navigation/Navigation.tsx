import React, {useEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import "./navigation.scss";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faMoon, faSignInAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {loginOutAction} from "../../store/actions/authActions";
import {faSun} from "@fortawesome/free-regular-svg-icons";


const Navigation = () => {

    const {auth} = useSelector((state: RootState) => state.authState)

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
    const [expandNavigation, setExpandNavigation] = useState(false);

    const [isDark, setDark] = useState<boolean>(false)


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

        let theme = localStorage.getItem("isDark")
        if(theme && theme === "1"){
            setDark(true)
        } else {
            setDark(false)
        }

        return () => document.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        handleResize();
        handleScroll()
    }, [location.pathname]);


    function handleLogout() {
        // signOutAction();
        dispatch(loginOutAction())
    }


    const items = [
        {path: "/", label: "Home"},
        {path: "/my-tasks", label: "My Tasks"},
        {path: "/media", label: "Media"},
        {path: "/add-task", label: "Add Task"},
        {path: "/my-tasks", state: {tab: 1}, label: "Completed Tasks"},
    ];

    function closeAuthDropdown() {
        setOpenAuthMenu(false);
    }

    function toggleTheme(isDark: boolean) {
        setDark(isDark)
        localStorage.setItem("isDark", isDark ? "1" : "0")
    }

    useEffect(() => {
        if(isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDark])


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


                    <div className="flex items-center">
                        <a>
                            <FontAwesomeIcon icon={faBars} className="block bar-icon relative sm:hidden text-xl mr-4"
                                             onClick={toggleNavigation}/>
                        </a>

                        {/*********** main navigation ***********/}
                        <div className={`flex gap-6 items-center main-nav ${expandNavigation ? "expand" : ""}`}>
                            {items.map((item, i) =>

                                <NavLink key={i}
                                         end={true}
                                         state={item?.state}
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

                                        <div
                                            className={`absolute w-52 card bg-white top-14 left-0 ${openAuthMenu ? "block" : "hidden"}`}>
                                            <a className="pt-1 flex items-center border-b-2 border-primary-200/20 pb-2 text-dark-300 dark:text-dark-200 ">
                                                <div className="w-6 rounded-full h-6 overflow-hidden">
                                                    <img className="w-full" src={auth.avatar} alt=""/>
                                                </div>
                                                <div className="flex flex-col">
                                                <span
                                                    className="text-sm font-semibold">{auth.username}</span>
                                                </div>
                                            </a>
                                            <div className="mt-2 text-dark-300 dark:text-dark-200 ">
                                                <li
                                                    className="pt-1 flex items-center gap-x-1 cursor-pointer hover:text-primary-500"
                                                    onClick={handleLogout}
                                                >Logout
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <NavLink to="/login">
                                        <FontAwesomeIcon icon={faSignInAlt} className={"text-sm mr-1"}/>
                                        Login
                                    </NavLink>
                                )}
                            </div>


                        </div>


                        <a className="ml-0 md:ml-4">
                            {isDark ? <FontAwesomeIcon icon={faSun}
                                       className="block bar-icon   text-xl mr-4"
                                       onClick={() => toggleTheme(false)}/> :
                                <FontAwesomeIcon icon={faMoon}
                                     className="block bar-icon text-xl mr-4"
                                     onClick={() => toggleTheme(true)}/>}
                        </a>
                    </div>


                </div>
            </div>
            <div className="header-height"/>
        </div>
    );
};

export default Navigation;
