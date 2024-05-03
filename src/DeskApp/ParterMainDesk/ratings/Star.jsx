import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineStar } from "react-icons/ai";

function Star({ rating, totalRating }) {
  const ratingStar = Array.from({ length: 5 }, (item, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{ color: "#fca103", fontSize: "15px" }}
          />
        ) : rating >= number ? (
          <FontAwesomeIcon
            key={index}
            icon={faStarHalfStroke}
            style={{ color: "#fca103", fontSize: "15px" }}
          />
        ) : (
          <AiOutlineStar
            key={index}
            style={{ color: "#fca103", fontSize: "18px" }}
          />
        )}
      </span>
    );
  });
  return (
    <>
      {ratingStar}
      {/* <FontAwesomeIcon icon={faStar} style={{ color: "#fca103" }} />
      <FontAwesomeIcon icon={faStarHalfStroke} style={{ color: "#fca103" }} /> */}
    </>
  );
}

export default Star;
