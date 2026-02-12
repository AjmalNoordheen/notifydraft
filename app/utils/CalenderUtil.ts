
    const daysInMonth = (month: number, year: number) =>
      new Date(year, month + 1, 0).getDate();

  export const generateCalendar = (date: Date, allDocuments: any[]) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const days = daysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Create array with empty cells for days before the first day of the month
    const calendarCells = [];

    // Add empty cells
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarCells.push({ day: null, documents: [] });
    }

    // Add actual days
    for (let day = 1; day <= days; day++) {
      const dayDocs = allDocuments.filter(
        (doc) =>
          doc.expiry.getDate() === day &&
          doc.expiry.getMonth() === month &&
          doc.expiry.getFullYear() === year
      );
      calendarCells.push({ day, documents: dayDocs });
    }

    return calendarCells;
  };

   const isCalenderPrevDisabled = (calendarMonth: Date) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    return (
      calendarMonth.getFullYear() < currentYear ||
      (calendarMonth.getFullYear() === currentYear &&
        calendarMonth.getMonth() <= currentMonth)
    );
  };

  export { isCalenderPrevDisabled as isPrevDisabled };