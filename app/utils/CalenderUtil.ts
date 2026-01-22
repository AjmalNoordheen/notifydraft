
    const daysInMonth = (month: number, year: number) =>
      new Date(year, month + 1, 0).getDate();

  export const generateCalendar = (date: Date, allDocuments: any[]) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const days = daysInMonth(month, year);
    return Array.from({ length: days }, (_, i) => {
      const day = i + 1;
      const dayDocs = allDocuments.filter(
        (doc) =>
          doc.expiry.getDate() === day &&
          doc.expiry.getMonth() === month &&
          doc.expiry.getFullYear() === year
      );
      return { day, documents: dayDocs };
    });
  };