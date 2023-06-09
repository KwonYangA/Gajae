import React, { useEffect, useState } from "react";
import "./Book_hotel.css";

import Book_HotelSearchBar from "./Book_HotelSearchBar";

/**
 *SearchBar 보여줌
 * @param {*} param0
 * @returns
 */
const HotelAvailabilityHeader = ({ row }) => {
  return (
    <>
      <div className="availabilitytitle">예약 가능 여부</div>
      <div>
        <Book_HotelSearchBar row={row} />
      </div>
    </>
  );
};

export default HotelAvailabilityHeader;
