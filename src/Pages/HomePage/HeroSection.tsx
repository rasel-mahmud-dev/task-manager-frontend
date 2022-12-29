import React from 'react';

const HeroSection = () => {
    return (
        <div>
            <section className="relative hero-section">

                <img src="/Task-management copy.webp" alt="" className="hero-image"/>

                <div className="max-w-5xl w-full absolute top-1/4 left-1/2 -translate-x-1/2 text-center px-2">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white">Welcome to Task Management </h1>
                    <p className="text-sm md:text-base text-dark-10 mt-4 md:mt-10">
                        Task management is the link between planning to do something and getting it done. Your task management software should provide an overview of work in progress that enables tracking from conception to completion. Enter MeisterTask: join teams everywhere who use our Kanban-style project boards to digitalize workflows and gain a clear overview of task progress. Let's get organized together!
                    </p>
                </div>


            </section>
        </div>
    );
};

export default HeroSection;