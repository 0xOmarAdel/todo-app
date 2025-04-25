const Button = ({ type, text, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      type={type || "button"}
      className={`transition duration-500 font-medium w-full py-2 px-4 bg-sky-500 text-white tracking-wide hover:bg-sky-600 rounded ${
        onClick && !disabled ? "cursor-pointer" : ""
      }`}
      onClick={onClick || (() => {})}
    >
      {text}
    </button>
  );
};

export default Button;
