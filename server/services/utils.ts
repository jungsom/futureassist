/** 날짜 분까지 */
export const formatDateToMinute = (date: Date): string => {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return date.toISOString().slice(0, 16).replace('T', ' ');
};
