import PropTypes from 'prop-types'

const Button = ({ 
    variant, 
    text, 
    link, 
    onClick,
    disabled = false 
}) => {
    const getBackgroundClass = (variant) => {
        switch (variant) {
            case 'primary':
                return `bg-roseFond border-roseBordure ${!disabled && 'hover:bg-roseBordure hover:border-roseFond'}`
            case 'secondary':
                return `bg-violetFond border-violetBordure ${!disabled && 'hover:bg-violetBordure hover:border-violetFond'}`
            default:
                return `bg-roseFond border-roseBordure ${!disabled && 'hover:bg-roseBordure hover:border-roseFond'}`
        }
    }

    const ButtonContent = () => (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`${getBackgroundClass(variant)} border py-2 text-sm lg:text-base px-6 lg:px-8 rounded-full text-white font-bold font-Roboto transition duration-200 linear ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {text}
        </button>
    )

    return (
        <div>
            {link ? (
                <a href={link}>
                    <ButtonContent />
                </a>
            ) : (
                <ButtonContent />
            )}
        </div>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

export default Button
