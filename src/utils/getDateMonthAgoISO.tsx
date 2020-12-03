export default () => {
  let now = new Date();
  const dateMonthAgo = now.setMonth(now.getMonth() - 1);
  return new Date(dateMonthAgo).toISOString().substring(0, 10);
};