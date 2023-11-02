import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", function () {
  // this is a low-value test, but better than nothing
  render(<Card rank="A" suit="C" />);
});
// end

it("has the correct alt text & src", function () {
  render(<Card rank="A" suit="C" />);

  const cardImage = screen.getByAltText("AC");
  expect(cardImage).toBeInTheDocument();
  expect(cardImage).toHaveAttribute("alt", "AC");
  expect(cardImage).toHaveAttribute(
    "src",
    "https://deckofcardsapi.com/static/img/AC.png"
  );
});
// end

it("has correct class name", function () {
  render(<Card rank="A" suit="C" />);
  const cardImage = screen.getByAltText("AC");
  expect(cardImage).toHaveClass("Card");
});

it("matches snapshot", function () {
  const { container } = render(<Card rank="A" suit="C" />);
  expect(container).toMatchSnapshot();
});
// end
