export const stringify = data => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    return null;
  };
}

export const parse = data => JSON.parse(data);