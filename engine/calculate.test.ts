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
  expect(
    calculateMoveInCash(
      10000,
      10000 * 0.05 + 10000 * 0.05 * 0.05,
      4,
      2500,
      false,
    ),
  ).toBeCloseTo(5745);
});

test("move in cash calculation(3)", () => {
  expect(
    calculateMoveInCash(
      10000,
      10000 * 0.05 + 10000 * 0.05 * 0.05,
      3,
      2500,
      false,
    ),
  ).toBeCloseTo(6578.333);
});

test("calculate first year total", () => {
  expect(
    calculateFirstYearTotal(
      10000,
      10000 * 0.05 + 10000 * 0.05 * 0.05,
      10000 * 0.05,
      false,
    ),
  ).toBeCloseTo(11245);
});

test("calculate first year total(1000000 aed)", () => {
  expect(
    calculateFirstYearTotal(
      1000000,
      1000000 * 0.05 + 1000000 * 0.05 * 0.05,
      1000000 * 0.05,
      false,
    ),
  ).toBeCloseTo(1102720);
});

test("calculate first year(first move)", () => {
  expect(
    calculateFirstYearTotal(
      10000,
      10000 * 0.05 + 10000 * 0.05 * 0.05,
      10000 * 0.05,
      true,
    ),
  ).toBeCloseTo(11375);
});

test("calculate true monthly cost", () => {
  expect(
    calculateTrueMonthly(
      10000,
      10000 * 0.05 + 10000 * 0.05 * 0.05,
      10000 * 0.05,
      false,
    ),
  ).toBeCloseTo(937.083);
});

test("calculate monthly listed cost", () => {
  expect(calculateListedMonthly(10000)).toBeCloseTo(833.333);
});

test("calculate annual housing fee", () => {
  expect(calculateHousingFee(10000).annual).toBeCloseTo(500);
});

test("calculate monthly housing fee", () => {
  expect(calculateHousingFee(10000).monthly).toBeCloseTo(41.666);
});

test("calculate agency fee(annual rent = 10000)", () => {
  expect(calculateAgencyFee(10000)).toBeCloseTo(
    10000 * 0.05 + 10000 * 0.05 * 0.05,
  );
});

test("calculate agency fee(annual rent = 100000)", () => {
  expect(calculateAgencyFee(100000)).toBeCloseTo(5000 + 100000 * 0.05 * 0.05);
});

test("evaluate check", () => {
  expect(evaluateCheque(11245, 4)).toBeCloseTo(2811.25);
});

test("calculate total deposit", () => {
  expect(calculateTotalDeposit(10000, "apartment", false, false)).toBeCloseTo(
    2500,
  );
});

test("furnished flips deposit", () => {
  expect(calculateTotalDeposit(10000, "apartment", false, true)).toBeCloseTo(
    3000,
  );
});

test("villa flips DEWA", () => {
  expect(calculateTotalDeposit(10000, "villa", false, false)).toBeCloseTo(4500);
});

test("chiller includes", () => {
  expect(calculateTotalDeposit(10000, "apartment", true, false)).toBeCloseTo(
    4500,
  );
});
