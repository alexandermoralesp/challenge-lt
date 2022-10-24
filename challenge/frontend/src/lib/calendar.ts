export function getMondayOfCurrentWeek(today: Date) {
  const first = today.getDate() - today.getDay();

  const monday = new Date(today.setDate(first));
  return monday;
}

export function UpdateDays(refDate: Date) {
  const todayDate = new Date();
  const firstDayCurrentMonth = new Date(refDate.getFullYear(), refDate.getMonth(), 1);

  const startDate = getMondayOfCurrentWeek(firstDayCurrentMonth);
  let date = new Date(startDate);

  let days: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
  }[] = [];

  Array.from({ length: 42 }, (x, i) => {
    let next_date = new Date(date.setDate(date.getDate() + 1));

    days.push({
      date: next_date,
      isCurrentMonth: refDate.getMonth() === next_date.getMonth(),
      isToday: todayDate.toDateString() === next_date.toDateString(),
    });
  });

  return days;
}
