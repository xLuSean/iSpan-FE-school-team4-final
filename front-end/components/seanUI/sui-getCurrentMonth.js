const getCurrentMonthDates = () => {
  // 取得當前日期
  const currentDate = new Date();

  // 取得當前月份的第一天
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // 取得下個月份的第一天，並減去一天，就是當前月份的最後一天
  const nextMonth =
    currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1;
  const firstDayOfNextMonth = new Date(currentDate.getFullYear(), nextMonth, 1);
  const lastDayOfMonth = new Date(firstDayOfNextMonth - 1);

  // 將日期格式化成 '2020-02-06' 的形式
  const formattedStartDate = formatDate(firstDayOfMonth);
  const formattedEndDate = formatDate(lastDayOfMonth);

  return { start: formattedStartDate, end: formattedEndDate };
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default getCurrentMonthDates;
