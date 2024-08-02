/** 날짜 분까지 */
export const formatDateToMinute = (date: Date): string => {
  return date.toISOString().slice(0, 16).replace('T', ' ');
};
