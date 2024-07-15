import React from 'react';
import { TbBriefcase2 } from 'react-icons/tb';
import { CiSearch } from 'react-icons/ci';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { IoHelpBuoyOutline } from 'react-icons/io5';
import { MdOutlinePerson4 } from 'react-icons/md';
import { TbBoxMultiple0 } from 'react-icons/tb';

const Header = () => {
    // Navigation links data
    const links = [
        {
            icon: <TbBriefcase2 />,
            name: 'Swiggy Corporate',
        },
        {
            icon: <CiSearch />,
            name: 'Search',
        },
        {
            icon: <RiDiscountPercentLine />,
            name: 'Offers',
            sup: 'NEW',
        },
        {
            icon: <IoHelpBuoyOutline />,
            name: 'Help',
        },
        {
            icon: <MdOutlinePerson4 />,
            name: 'Sign In',
        },
        {
            icon: <TbBoxMultiple0 />,
            name: 'Cart',
        },
    ];

    return (
        <>
            <header className="p-4 shadow-xl text-gray-700 sticky top-0 bg-white z-50">
                <div className="max-w-screen-xl mx-auto flex items-center">
                    <div className="w-20 md:w-32">
                        <img src="images/logo.png" className="w-full" alt="logo" />
                    </div>
                    <nav className="flex ml-auto items-center space-x-4 text-base md:text-lg">
                        {links.map((link, index) => (
                            <a key={index} href="#" className="flex items-center text-gray-700 hover:text-orange-500">
                                {link.icon}
                                <span className="ml-1">{link.name}</span>
                                {link.sup && <span className="text-xs ml-1 bg-yellow-500 text-white px-1 rounded">{link.sup}</span>}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
