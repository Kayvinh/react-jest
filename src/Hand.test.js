import React from "react";
import { render, screen } from "@testing-library/react";
import Hand from "./Hand";

const hand = [{ rank: "7", suit: "H" }, { rank: "A", suit: "S" }];

it("renders 2 cards", function () {
  render(<Hand cards={hand} />);
  const cardElements = screen.getAllByRole("img", { name: /./, class: "Card" });
    expect(cardElements).toHaveLength(hand.length);
});

it("matches snapshot", function () {
  const { container } = render(<Hand cards={hand} />);
  expect(container).toMatchSnapshot();
});
