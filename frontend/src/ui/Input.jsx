const Input = ({ id, type = "text", value, placeholder, name, onChange }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
      id={id}
      type={type}
      value={value}
      name={name}
      onChange={handleInputChange}
      autoComplete="off"
      placeholder={placeholder}
    />
  );
};

export default Input;
