import React, { useState } from "react";

export default function ReviewStars() {
  const [star, setStar] = useState(0);
  const handelClick = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.getAttribute("value"));
    setStar(e.target.getAttribute("value"));
  };
  return (
    <div>
      <h4>Ratings :</h4>
      <span className="">
        {[...Array(5)].map((val, index) => {
          return (
            <i
              className={index < star ? "fa fa-star" : "fa fa-star-o"}
              value={index + 1}
              onClick={handelClick}
              key={index}
            >
              &nbsp;
            </i>
          );
        })}
      </span>
    </div>
  );
}