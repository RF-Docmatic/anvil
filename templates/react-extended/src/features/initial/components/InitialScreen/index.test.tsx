import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import InitialScreen from "./index";

describe("InitialScreen component", () => {
  beforeAll(() => {
    render(<InitialScreen />);
  });

  it("should have the right message in the dom", () => {
    const message = "Create Random Forest App";

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
