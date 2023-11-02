import { choice } from "./random";

const SUITS = "CDHS";
const RANKS = "234567890JQKA";
const RANK_TO_VALUE = { J: 10, Q: 10, K: 10, A: 11 };

/** Return a random card: { rank, suit } */
function getRandomCard() {
  return { rank: choice(RANKS), suit: choice(SUITS) };
}

/** Return random pair: [ { rank, suit }, { rank, suit } ] */
function getPair() {
  return [getRandomCard(), getRandomCard()];
}

/** Score a hand: score is the last digit of rank sums */
function scoreHand(hand) {
  let sum = 0;

  for (let card of hand) {
    sum += RANK_TO_VALUE[card.rank] || +card.rank;
  }

  return sum % 10;
}

/** Score game: player loses ties to dealer. */
function score(playerHand, dealerHand) {
  return scoreHand(playerHand) > scoreHand(dealerHand)
      ? "You win!"
      : "You lose!";
}
// end


export { getRandomCard, getPair, scoreHand, score };