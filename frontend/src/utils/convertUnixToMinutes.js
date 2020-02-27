const convertUnixToMinutes = dataSource => {
  const getHours = new Date(dataSource).getHours();
  const getMinutes = new Date(dataSource).getMinutes();
  const countedMinutes = getHours * 60 + getMinutes;
  return countedMinutes;
};

export default convertUnixToMinutes;
