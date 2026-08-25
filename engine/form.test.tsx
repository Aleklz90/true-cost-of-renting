import { render, screen } from "@testing-library/react";
import CalculatorForm from "../components/CalculatorForm";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

test("calculator i/o test", async () => {
  const user = userEvent.setup();
  render(<CalculatorForm />);

  const annualRentInput = screen.getByLabelText("Annual rent");
  const chequesInput = screen.getByLabelText("Cheques");
  const propertyTypeInput = screen.getByLabelText("Property type");

  await user.type(annualRentInput, "10000");
  await user.selectOptions(chequesInput, "4");
  await user.selectOptions(propertyTypeInput, "apartment");

  await user.click(screen.getByRole("button", { name: /Calculate/i }));

  expect(screen.getByText("5,745")).toBeInTheDocument();
  expect(screen.getByText("11,245")).toBeInTheDocument();
  expect(screen.getByText("937")).toBeInTheDocument();
});
