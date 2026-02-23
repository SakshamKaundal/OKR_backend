import { describe, it, expect } from 'vitest';
import { isLeapYear } from './leap-year';

describe('isLeapYear', () => {
  it('should return false if the year is not divisible by 4', () => {
    expect(isLeapYear(2021)).toBe(false);
  });

  it('should return true if the year is divisible by 4', () => {
    expect(isLeapYear(2020)).toBe(true);
  });

  it('should return true if the year is (divisible by 4 ,not divisible by 100 ) OR divisible by 400', () => {
    expect(isLeapYear(2000)).toBe(true);
  });
});
