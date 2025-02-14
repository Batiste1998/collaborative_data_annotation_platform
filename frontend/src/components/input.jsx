import PropTypes from 'prop-types'

const Input = ({
    text,
    name,
    placeholder,
    value,
    onChange,
    type = 'text',
    required = false,
    error
}) => {
    return(
        <div className="flex flex-col gap-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">{text}</label>
            <input
                type={type}
                name={name}
                className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-roseFond focus:border-transparent`}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                required={required}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}

Input.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string
}

export default Input
