import React, { useState } from "react";
import "./NineteenGame.css";

import { getRandomCard, getPair, score } from "./nineteen";
import Hand from "./Hand";


/** Play a game of Nineteen:
 *
 * (for this simple version, we don't use a deck --- each card is random)
 *
 * State:
 * - playerHand: array of cards
 * - dealerHand: array of cards
 */

function NineteenGame() {
  const [playerHand, setPlayerHand] = useState(getPair);
  const [dealerHand, setDealerHand] = useState([]);
  /** Player draws a card and then dealer plays. */
  function takeCard() {
    setPlayerHand(h => [...h, getRandomCard()]);
    playDealer();
  }
  /** Dealer draws a pair and then hand is scored. */
  function playDealer() {
    setDealerHand(getPair());
  }
  const result = dealerHand.length > 0 ? score(playerHand, dealerHand) : null;

  return (
      <main>
        <Hand cards={dealerHand} />
        <Hand cards={playerHand} />
        {result === null && <p>
          <button id="draw" onClick={takeCard}>Draw</button>
          <button id="pass" onClick={playDealer}>Pass</button>
        </p>}
        {result !== null && <p>{result}</p>}
      </main>
  );
}
// end

export default NineteenGame;
