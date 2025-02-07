import { useState, useRef, useEffect } from "react";

const MultiSelect = ({ label, placeholder, list, variant }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const selectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleSelection = (option) => {
        setSelected((prevSelected) =>
            prevSelected.includes(option)
                ? prevSelected.filter((item) => item !== option)
                : [...prevSelected, option]
        );
    };

    return (
        <div className="relative" ref={selectRef}>
            <div className={`flex gap-4 ${variant === "primary" ? "flex-col" : "flex-row items-center justify-between pl-20"}`}>
                <label className="text-black font-Roboto font-bold text-xl">{label}</label>
                <button
                    className="min-w-[300px] bg-white border border-black rounded-full px-4 py-3 text-left flex justify-between items-center cursor-pointer 
                    focus:outline-none text-gray font-Roboto font-bold focus:bg-bleuElectrique focus:text-white transition duration-200 linear"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selected.length > 0 ? selected.join(", ") : placeholder}
                    <svg className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <ul className={`absolute mt-2 bg-white border border-black rounded-xl shadow-lg z-10  ${variant === "primary" ? "w-full" : "translate-x-[50%] min-w-[300px]"}`}>
                    {list.map((option, index) => (
                        <li
                            key={index}
                            className={`px-4 py-3 cursor-pointer transition ${variant === "primary" ? "w-full" : "min-w-[300px]"} rounded-xl font-Roboto font-semibold text-gray flex items-center hover:bg-roseFond hover:text-white`}
                            onClick={() => toggleSelection(option)}
                        >
                            <input 
                                type="checkbox" 
                                checked={selected.includes(option)} 
                                onChange={() => toggleSelection(option)} 
                                className="mr-2"
                            />
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MultiSelect;