const dateFormatter = (inputDate) => {
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const [year, month, day] = inputDate.split("-");

  const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString(
    "en-US",
    options
  );

  return formattedDate;
};

export default dateFormatter;
