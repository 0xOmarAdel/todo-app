export const calculateDaysDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceInMs = end.getTime() - start.getTime();

  const daysDifference = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  return daysDifference;
};
