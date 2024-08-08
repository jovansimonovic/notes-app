// checks if provided string is an email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// checks if password is at least 8 characters long,
// has at least 1 capital letter and at least 1 digit
export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
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
