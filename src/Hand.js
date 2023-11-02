import React from "react";
import Card from "./Card";
import "./Hand.css";

/** Show a hand of cards.
 *
 * Props:
 * - cards: [ { rank, suit }, ... ]
 */

function Hand({cards}) {
  return (
    <div className="Hand">
      {cards.map((c, idx) =>
          <Card
            key={idx}
              rank={c.rank}
              suit={c.suit}/>)}
    </div>
  );
}

// end

export default Hand;
