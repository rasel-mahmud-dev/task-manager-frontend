import React from 'react';

const Services = () => {

    const data = [
        { label: "Observer your time", image: "/images/check-list.png" },
        { label: "Manage your time", image: "/images/task.png" },
        { label: "Observer your time", image: "/images/check-list.png" },
        { label: "Observer your time", image: "/images/schedule.png" },
        { label: "Take a List", image: "/images/timetable.png" },
    ]

    return (
        <div className="container">

            <h1 className="section-title">Services</h1>


            <div className="grid grid-cols-4 gap-4">
                { data.map(item=>(
                    <div className="card">
                        <img className="w-14 mx-auto"  src={item.image} alt=""/>
                        <h3 className="text-center font-medium text-sm text-dark-300 mt-3">{item.label}</h3>
                    </div>
                )) }
            </div>

        </div>
    );
};

export default Services;