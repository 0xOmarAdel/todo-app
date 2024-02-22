const Card = (props) => {
  let classes = "h-fit py-10 px-6 bg-white shadow-lg rounded-xl text-center";

  if (props.className) {
    classes += " " + props.className;
  }

  return <div className={classes}>{props.children}</div>;
};

export default Card;
