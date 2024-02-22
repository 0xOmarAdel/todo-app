import userImage from "../assets/user.png";

const Avatar = () => {
  return (
    <img
      className="w-12 h-12 rounded-full cursor-pointer"
      src={userImage}
      alt="User Image"
    />
  );
};

export default Avatar;
