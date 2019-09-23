/**
* Removes the listed fields from the source
* @param {*} form The source object
* @param {*} fields The fields list
*/
export const clean = (form, fields) => {
  const result = {};
  // eslint-disable-next-line no-unused-vars
  for (const field in form) {
    if (!form.hasOwnProperty(field) || fields.includes(field)) {
      continue;
    }
    result[field] = form[field];
  }
  return result;
};
