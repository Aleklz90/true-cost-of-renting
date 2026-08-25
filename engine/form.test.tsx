import { render, screen } from "@testing-library/react";
import CalculatorForm from "../components/CalculatorForm";
import userEvent from "@testing-library/user-event";
import { test, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";

test("calculator i/o test(apartment)", async () => {
  const user = userEvent.setup();
  render(<CalculatorForm />);

  const annualRentInput = screen.getByLabelText("Annual rent");
  const chequesInput = screen.getByLabelText("Cheques");
  const propertyTypeInput = screen.getByLabelText("Property type");

  await user.type(annualRentInput, "10000");
  await user.selectOptions(chequesInput, "4");
  await user.selectOptions(propertyTypeInput, "apartment");

  await user.click(screen.getByRole("button", { name: /Calculate/i }));

  expect(screen.getByText("AED 5,745.00")).toBeInTheDocument();
  expect(screen.getByText("AED 11,245.00")).toBeInTheDocument();
  expect(screen.getByText("AED 937.08")).toBeInTheDocument();
});

afterEach(() => {
  cleanup();
});

test("calculator i/o test(villa)", async () => {
  const user = userEvent.setup();
  render(<CalculatorForm />);

  const annualRentInput = screen.getByLabelText("Annual rent");
  const chequesInput = screen.getByLabelText("Cheques");
  const propertyTypeInput = screen.getByLabelText("Property type");

  await user.type(annualRentInput, "10000");
  await user.selectOptions(chequesInput, "4");
  await user.selectOptions(propertyTypeInput, "villa");

  await user.click(screen.getByRole("button", { name: /Calculate/i }));

  expect(screen.getByText("AED 7,745.00")).toBeInTheDocument();
  expect(screen.getByText("AED 11,245.00")).toBeInTheDocument();
  expect(screen.getByText("AED 937.08")).toBeInTheDocument();
});

afterEach(() => {
  cleanup();
});
