import userImage from "../assets/user.png";

const Avatar = ({ onClick }) => {
  return (
    <img
      className="w-12 h-12 rounded-full cursor-pointer"
      src={userImage}
      alt="User Image"
      onClick={onClick || (() => {})}
    />
  );
};

export default Avatar;
