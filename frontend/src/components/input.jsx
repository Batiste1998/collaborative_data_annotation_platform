import PropTypes from 'prop-types'

const Input = ({
    text,
    placeholder,
    value,
    onChange,
    type = 'text',
    required = false
}) => {
    return(
        <div className="flex flex-col gap-4">
            <label className="text-lg font-bold text-black font-Roboto md:text-xl">{text}</label>
            <input
                type={type}
                className="inputCreation"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}

Input.propTypes = {
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    required: PropTypes.bool
}

export default Input
