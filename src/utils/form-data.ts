export const objToFormData = (
  data: object,
  allowFalsy: string[] = [],
  plainTextField: string[] = []
) => {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Input data must be an object');
  }

  const formData = new FormData();

  Object.keys(data).forEach((fieldName: string) => {
    if (!data[fieldName as keyof typeof data] && !allowFalsy.includes(fieldName)) {
      return;
    }
    if (plainTextField.includes(fieldName)) {
      formData.append(fieldName, JSON.stringify(data[fieldName as keyof typeof data]));
    } else {
      formData.append(fieldName, data[fieldName as keyof typeof data]);
    }
  });

  return formData;
};
