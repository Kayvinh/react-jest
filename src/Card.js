import React from "react";
import "./Card.css";

const IMG_BASE = "https://deckofcardsapi.com/static/img";

/** Show a single card.
 *
 * Props:
 * - rank: 1-9,0,J,Q,K,A
 * - suit: C,D,H,S
 */

function Card({ rank, suit }) {
  const id = rank + suit;
  return (
      <img
          className="Card"
          src={`${IMG_BASE}/${id}.png`}
          alt={id}
      />
  );
}
// end

export default Card;
