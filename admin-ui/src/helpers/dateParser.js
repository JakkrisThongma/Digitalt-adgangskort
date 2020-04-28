const dateParser = date => {
  if (Date.parse(date))
    return new Date(date).toLocaleString("no-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  return "";
};

export default dateParser