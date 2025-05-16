const oneDay = 24 * 60 * 60 * 1000;

export const oneYearFromNow = () => {
  const newDate = new Date(Date.now() + 365 * oneDay);
  return newDate;
};

export const thirtyDaysFromNow = () => {
  const newDate = new Date(Date.now() + 30 * oneDay);
  return newDate;
};

export const fifteenMinutesFromNow = () => {
  const newDate = new Date(Date.now() + 15 * 60 * 1000);
  return newDate;
};
