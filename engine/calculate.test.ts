import { expect, test } from "vitest";
import {
  calculateMoveInCash,
  calculateFirstYearTotal,
  calculateTrueMonthly,
  calculateListedMonthly,
  calculateHousingFee,
  calculateAgencyFee,
  evaluateCheque,
  calculateTotalDeposit,
} from "./calculate";

test("move in cash calculation(4)", () => {
  expect(calculateMoveInCash(10000, 4, 2500, false)).toBe(5745);
});

test("move in cash calculation(3)", () => {
  expect(calculateMoveInCash(10000, 3, 2500, false)).toBe(6578);
});

test("calculate first year total", () => {
  expect(
    calculateFirstYearTotal(
      10000,
      10000 * 0.05 + 10000 * 0.05 * 0.05,
      10000 * 0.05,
      false,
    ),
  ).toBe(11245);
});

test("calculate first year total(1000000 aed)", () => {
  expect(
    calculateFirstYearTotal(
      1000000,
      1000000 * 0.05 + 1000000 * 0.05 * 0.05,
      1000000 * 0.05,
      false,
    ),
  ).toBe(1102720);
});

test("calculate first year(first move)", () => {
  expect(
    calculateFirstYearTotal(
      10000,
      10000 * 0.05 + 10000 * 0.05 * 0.05,
      10000 * 0.05,
      true,
    ),
  ).toBe(11375);
});

test("calculate true monthly cost", () => {
  expect(
    calculateTrueMonthly(
      10000,
      10000 * 0.05 + 10000 * 0.05 * 0.05,
      10000 * 0.05,
      false,
    ),
  ).toBe(937);
});

test("calculate monthly listed cost", () => {
  expect(calculateListedMonthly(10000)).toBe(833);
});

test("calculate annual housing fee", () => {
  expect(calculateHousingFee(10000).annual).toBe(500);
});

test("calculate monthly housing fee", () => {
  expect(calculateHousingFee(10000).monthly).toBe(42);
});

test("calculate agency fee", () => {
  expect(calculateAgencyFee(10000)).toBe(10000 * 0.05 + 10000 * 0.05 * 0.05);
});

test("calculate agency fee", () => {
  expect(calculateAgencyFee(100000)).toBe(5000 + 100000 * 0.05 * 0.05);
});

test("evaluate check", () => {
  expect(evaluateCheque(11245, 4)).toBe(2811);
});

test("calculate total deposit", () => {
  expect(calculateTotalDeposit(false, false, "apartment", 10000)).toBe(2500);
});

test("furnished flips deposit", () => {
  expect(calculateTotalDeposit(true, false, "apartment", 10000)).toBe(3000);
});

test("villa flips DEWA", () => {
  expect(calculateTotalDeposit(false, false, "villa", 10000)).toBe(4500);
});

test("chiller includes", () => {
  expect(calculateTotalDeposit(false, true, "apartment", 10000)).toBe(4500);
});
