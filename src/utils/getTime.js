export const getTime = (timestamp) => {
  let date = new Date(+timestamp);
  if (!+date) date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes.toString();
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
