import { describe, it, expect } from 'vitest';
import { isLeapYear } from './leap-years';

describe('isLeapYear', () => {
  it('should return false if year is not divisile by 4', () => {
    expect(isLeapYear(2021)).toBe(false);
  });
  it('should return true if year is divisible by 4', () => {
    expect(isLeapYear(2020)).toBe(true);
  });
  it('should return false if year is divisible by 4, divisible by 100 but not by 400', () => {
    expect(isLeapYear(2100)).toBe(false);
  });
});
