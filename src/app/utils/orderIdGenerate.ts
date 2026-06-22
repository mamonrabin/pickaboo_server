const orderIdGenerate = (prefix = 'ORD-') => {
  const date = new Date();

  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const time = Date.now().toString().slice(-5); // adds uniqueness
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${prefix}${year}${month}${day}-${time}${random}`;
};

export default orderIdGenerate;
