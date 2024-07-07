// checks if provided string is an email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// formats the date
export const formatDate = (dateToFormat) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Date(dateToFormat);

  return date.toLocaleDateString("en-US", options);
};
