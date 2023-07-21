import React, { useState } from "react";

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute top-2 left-20 z-50">
            <button className="inline-flex items-center px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded" onClick={toggleDropdown}>
                Dropdown
                <svg className={`fill-current h-4 w-4 ml-2 ${isOpen ? "transform rotate-180" : ""}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5z" className="text-gray-600 fill-current" />
                </svg>
            </button>

            {isOpen && (
                <div className="relative right-0 w-48 py-2 mt-2 bg-white shadow-lg rounded-md">
                    {/* Dropdown menu items */}
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Option 1
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Option 2
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Option 3
                    </a>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
