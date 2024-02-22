const Card = (props) => {
  let classes =
    "h-fit py-10 px-6 lg:px-10 bg-white shadow-lg rounded-xl text-center";

  if (props.className) {
    classes += " " + props.className;
  }

  return <div className={classes}>{props.children}</div>;
};

export default Card;
