import React from 'react';
import {FaHome,FaUser,FaBars,} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const routes = [
        {
          path: "/",
          name: "Dashboard",
          icon: <FaHome />,
        },
        {
          path: "/user",
          name: "User",
          icon: <FaUser />,
        },
        {
          path: "/name",
          name: "Names",
          icon: <MdMessage />,
        },
        {
          path: "/analytics",
          name: "Analytics",
          icon: <BiAnalyse />,
        },
        {
          path: "/filemanager",
          name: "File Manager",
          icon: <AiTwotoneFileExclamation />,
        },
        {
          path: "/order",
          name: "Order",
          icon: <BsCartCheck />,
        },
        {
          path: "/settings",
          name: "Settings",
          icon: <BiCog />,
          exact: true,
        },
      ];
  return (
    <div className='main_container'>
      <div className="sidebar">
        <div className="top_section">
            <div className="logo">DoSomeCoding</div>
            <div className="bars"><FaBars/></div>
        </div>
        <div className="search">
            <div className="search_icon">
                <BiSearch/>
            </div>
            <div className="search_input">
                <input type="text" placeholder='Search...' />
            </div>
        </div>
        <section className='routeManager'>
            {
                routes.map((route,index)=>(
                    <NavLink to={route.path} key={index} >
                        <div className="icons">
                            {route.icon}
                        </div>
                        <div className="link">
                            {route.name}
                        </div>
                    </NavLink>

                ))
            }
        </section>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar;
