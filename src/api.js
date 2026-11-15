
const seededRandom = function (seed) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;

  return function () {
    s = (s * a) % m;
    return s / m;
  };
};

export const fetchAPI = function (date) {
  const result = [];
  const random = seededRandom(date.getDate());

  for (let hour = 17; hour <= 23; hour++) {
    if (random() < 0.5) {
      result.push(`${hour}:00`);
    }

    if (random() < 0.5) {
      result.push(`${hour}:30`);
    }
  }

  return result;
};

export const submitAPI = function () {
  return true;
};
