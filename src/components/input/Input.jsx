const Input = ({ className = '', ...props }) => {
    const baseStyles = 'p-3 border border-gray-300 rounded outline-none focus:border-transparent focus:ring-2 focus:ring-[#08436B] transition-all duration-200';

    return (
        <input
            className={`${baseStyles} ${className}`}
            {...props}
        />
    )
}

export default Input
