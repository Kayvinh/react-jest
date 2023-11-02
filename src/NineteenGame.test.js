import * as random from "./random";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NineteenGame from "./NineteenGame.js";

random.choice = jest.fn();

/** Seeds choice fn with data for given cards, eg "AS 7D 4C" */
function _feedChoice(cardsStr) {
  for (let val of cardsStr.replace(/ /g, "")) {
    random.choice.mockReturnValueOnce(val);
  }
}
// end

describe("snapshot tests for stability", function () {
  it("matches initial player hand: 2C 3C", function () {
    _feedChoice("2C 3C");
    const { container } = render(<NineteenGame />);
    expect(container).toMatchSnapshot();
  });
  // end

  it("matches winning game: 2C 3C 4C > 5C 6C", function () {
    _feedChoice("2C 3C 4C   5C 6C");
    const { container } = render(<NineteenGame />);
    fireEvent.click(screen.getByRole("button", { name: "Draw" }));
    expect(container).toMatchSnapshot();
  });
  // end

  it("matches losing game: 2C 3C < 4C 5C", function () {
    _feedChoice("2C 3C   4C 5C");
    const { container } = render(<NineteenGame />);
    fireEvent.click(screen.getByRole("button", { name: "Pass" }));
    expect(container).toMatchSnapshot();
  });
});

// This test does not use the container method
describe("game playing works", function () {
  it("deals to player on draw", function () {
    _feedChoice("2C 3C 4C   5C 6C");
    render(<NineteenGame />);

    const cardElements = screen.getAllByRole("img");
    expect(cardElements).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Draw" }));
    let cardsAfterDraw = screen.getAllByRole("img");

    // now player has 3 cards (=9) and dealer has 2 cards (=11)
    expect(cardsAfterDraw).toHaveLength(5);

    const message = screen.getByText("You win!");
    expect(message).toBeTruthy();
  });
  // end

  it("doesn't deal to player on pass", function () {
    _feedChoice("2C 3C   4C 5C");
    render(<NineteenGame />);
    const cardElements = screen.getAllByRole("img");
    expect(cardElements).toHaveLength(2);

    const passBtn = screen.getByRole("button", { name: "Pass" });
    fireEvent.click(passBtn);

    const cardsAfterPass = screen.getAllByRole("img");
    // now player has 2 cards (=5) and dealer has 2 cards (=9)
    expect(cardsAfterPass).toHaveLength(4);

    const message = screen.getByText("You lose!");
    expect(message).toBeTruthy();
  });
});
