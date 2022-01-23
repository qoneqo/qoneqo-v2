export const StrLimit = (text, limit = 90) => {
  text = (text.length > limit) ? text.substring(0, limit)+'..' : text;
  return text;
};

export default StrLimit;