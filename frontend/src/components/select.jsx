import { useState, useRef, useEffect } from "react"
import PropTypes from 'prop-types'

const Select = ({ 
    label, 
    placeholder = "Sélectionner", 
    list = [], 
    value, 
    onChange, 
    variant = "primary",
    error
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Trouver le label correspondant à la valeur sélectionnée
    const selectedLabel = list.find(item => item.value === value)?.label || placeholder

    const handleSelect = (selectedValue) => {
        onChange(selectedValue)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={selectRef}>
            <div className={`flex gap-4 ${
                variant === "primary" 
                    ? "flex-col" 
                    : "flex-row items-center justify-between pl-2 sm:pl-5 lg:pl-8 xl:pl-20 flex-wrap"
            }`}>
                {label && (
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <button
                    className={`min-w-[200px] bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2 text-left flex justify-between items-center cursor-pointer 
                    focus:outline-none text-gray font-Roboto font-medium focus:ring-2 focus:ring-roseFond focus:border-transparent transition duration-200 linear`}
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                >
                    {selectedLabel}
                    <svg 
                        className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={3} 
                            d="M19 9l-7 7-7-7" 
                        />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <ul className={`absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-20 w-full min-w-[200px]`}>
                    {list.map((option) => (
                        <li
                            key={option.value}
                            className="px-4 py-2 font-semibold transition cursor-pointer rounded-xl font-Roboto text-gray hover:bg-roseFond hover:text-white"
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })),
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    error: PropTypes.string
}

export default Select
