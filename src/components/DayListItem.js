import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  const formatSpots = function (spot) {
    if (spot === 0) {
      return <h3 className="text--light">no spots remaining</h3>;
    } else if (spot === 1) {
      return <h3 className="text--light">{spot} spot remaining</h3>;
    } else {
      return <h3 className="text--light">{spot} spots remaining</h3>;
    }
  };
  return (
    <li className={dayClass} data-testid="day">
      <h2 onClick={() => props.setDay(props.name)} className="text--regular">
        {props.name}
      </h2>
      {formatSpots(props.spots)}
    </li>
  );
}

