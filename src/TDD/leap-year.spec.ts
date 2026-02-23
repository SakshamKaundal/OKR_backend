import { describe, it, expect } from 'vitest';
import { isLeapYear } from './leap-year';

describe('isLeapYear', () => {
  it('should return false if the year is not divisible by 4', () => {
    expect(isLeapYear(2021)).toBe(false);
  });

  it('should return true if the year is divisible by 4', () => {
    expect(isLeapYear(2020)).toBe(true);
  });
});
