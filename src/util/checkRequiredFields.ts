export default (object: any, ...requiredFields: string[]) => {
  requiredFields.forEach((field) => {
    if (!object[field]) throw new Error(`Missing required field: ${field}`);
  });
};
