import * as random from "./random";
import { getRandomCard, getPair, scoreHand, score } from "./nineteen";

random.choice = jest.fn();


test("getRandomCard", function () {
  random.choice.mockReturnValueOnce("9").mockReturnValueOnce("C");
  const card = getRandomCard();
  expect(card).toEqual({ rank: "9", suit: "C" });
});

test("getPair", function () {
  random.choice
    .mockReturnValueOnce("A")
    .mockReturnValueOnce("S")
    .mockReturnValueOnce("9")
    .mockReturnValueOnce("C");
  const pair = getPair();
  expect(pair).toEqual([
    { rank: "A", suit: "S" },
    { rank: "9", suit: "C" },
  ]);
});
// end

describe("scoreHand", function () {
  test("scores 2 cards", function () {
    const hand = [
      { rank: "A", suit: "S" },
      { rank: "9", suit: "C" },
    ];
    expect(scoreHand(hand)).toEqual(0);
  });

  test("scores 3 cards", function () {
    const hand = [
      { rank: "A", suit: "S" },
      { rank: "9", suit: "C" },
      { rank: "7", suit: "D" },
    ];
    expect(scoreHand(hand)).toEqual(7);
  });
});
// end

describe("score", function () {
  const dealerHand = [
    { rank: "2", suit: "S" },
    { rank: "3", suit: "C" },
  ];

  test("player win", function () {
    const playerHand = [
      { rank: "2", suit: "S" },
      { rank: "7", suit: "C" },
    ];
    expect(score(playerHand, dealerHand)).toEqual("You win!");
  });
  // end

  test("player lose: lower count", function () {
    const playerHand = [
      { rank: "2", suit: "S" },
      { rank: "A", suit: "C" },
    ];
    expect(score(playerHand, dealerHand)).toEqual("You lose!");
  });

  test("player lose: ties", function () {
    const playerHand = [
      { rank: "2", suit: "S" },
      { rank: "3", suit: "C" },
    ];
    expect(score(playerHand, dealerHand)).toEqual("You lose!");
  });
});
