import { describe, it, expect } from 'vitest';
import { isLeapYear } from './leap-years';

describe('isLeapYear', () => {
  it('should return false if year is not divisile by 4', () => {
    expect(isLeapYear(2021)).toBe(false);
  });
});
