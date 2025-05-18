
const Button = ({ children, className = '', ...props }) => {
    const baseStyles = 'bg-[#08436B] text-white py-2 rounded-md font-semibold cursor-pointer transition-colors hover:bg-[#063652]';

    return (
        <button className={`${baseStyles} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
