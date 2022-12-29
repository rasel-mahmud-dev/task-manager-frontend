import React from 'react';
import {Link} from "react-router-dom";

const Services = () => {

    const data = [
        { label: "Observer your time", image: "/images/check-list.png" },
        { label: "Manage your tasks", image: "/images/task.png" },
        { label: "Observer your time", image: "/images/check-list.png" },
        { label: "Observer your time", image: "/images/schedule.png" },
        { label: "Take a List", image: "/images/timetable.png" },
    ]

    return (
        <div className="container section">

            <h1 className="section-title">Services</h1>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                { data.map(item=>(
                    <div className="card py-6">
                        <img className="w-14 mx-auto"  src={item.image} alt=""/>
                        <h3 className="text-center font-medium text-sm text-dark-300 dark:text-dark-100 mt-3">{item.label}</h3>
                    </div>
                )) }
            </div>

            <div className="py-20">

            <Link to="/add-task">
            <div className="bg-blue-500 rounded-full w-7/12 mx-auto text-center py-3 text-white text-sm">Create Your Tasks</div>
            </Link>

            </div>
        </div>
    );
};

export default Services;