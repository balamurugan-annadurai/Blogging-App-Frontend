const FilterSelect = ({ name, label, value, onChange, options }) => {
    return (
        <select
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-full sm:w-48 p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-[#08436B]"
        >
            <option value="">{label}</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export default FilterSelect;
