export function isLeapYear(year: number): boolean {
  if (year % 4 === 0) return true;
  if (year % 4 !== 0) return false;
}
