import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {

    const data = [
        {url: "https://www.facebook.com/rasel-mahmud-dev", icons: <FontAwesomeIcon icon={faFacebook}/>},
        {url: "https://github.com/rasel-mahmud-dev", icons: <FontAwesomeIcon icon={faGithub}/>},
        {url: "https://rasel-portfolio.vercel.app/", icons: <FontAwesomeIcon icon={faGlobe}/>},
        {url: "https://www.linkedin.com/in/rasel-mahmud-dev", icons: <FontAwesomeIcon icon={faLinkedin}/>}
    ]

    return (
        <div className="bg-blue-500/10 mt-20 backdrop-blur">
            <div className="container flex justify-between flex-col md:flex-row gap-y-4 items-center py-8">
                <h2>© {new Date().getFullYear()} Rasel Mahmud All Rights Reserved. </h2>
                <ul className="flex gap-4 ">
                    {data.map(item => (
                        <a
                            className="hover:bg-blue-500 hover:border-blue-500 transition transition-colors hover:text-white w-10 h-10 md:w-8 md:h-8 flex justify-center items-center border text-dark-300 dark:border-neutral border-dark-300   rounded-full"
                            href={item.url}
                        >
                            {item.icons}
                        </a>
                    ))}

                </ul>
            </div>
        </div>
    );
};

export default Footer;