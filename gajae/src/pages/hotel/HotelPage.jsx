import React, { useEffect, useRef, useState } from "react";
import { Button, Offcanvas, OffcanvasBody } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import HeaderNav1 from "../../components/header/HeaderNav1";
import HotelFacilities from "../../components/hotel/HotelFacilities";
import HotelInformation from "../../components/hotel/HotelInformation";
import HotelPolicies from "../../components/hotel/HotelPolicies";
import HotelReview from "../../components/hotel/HotelReview";
import { hotelDetailDB } from "../../service/hotelReservLogic";
import HotelAvailabilityRow from "../../components/hotel/HotelAvailabilityRow";
import HotelAvailabilityHeader from "../../components/hotel/HotelAvailabilityHeader";
import Cookies from "js-cookie";
import styled from "styled-components";
import HeaderNav2 from "../../components/header/HeaderNav2";

/**
 * 사용자가 선택한 호텔의 정보를 보여준다.
 * @returns 예약 가능 옵션보기 페이지
 */
const HotelPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //스크롤기능구현 배열 ref생성
  const availabilityRef = useRef(null);
  const reviewRef = useRef(null);
  const facilitiesRef = useRef(null);
  const policiesRef = useRef(null);

  const onMoveToAvailability = () => {
    availabilityRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* const onMoveToReview = () => {
     reviewRef?.current?.scrollIntoView({
     behavior: "smooth",
     block: "start",
     });
      }; */
  const onMoveToFacilities = () => {
    facilitiesRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const onMoveToPolicies = () => {
    policiesRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  //호텔정보 담기
  const [property, setProperty] = useState([{}]);
  //HotelAvailabilityRow 컴포넌트에 넘겨줄 정보 - 함수의 인자로 전달하기
  //의존성 배열 위치 아이디 받아오는걸로 수정하기 - 현재는 상수로 설정해놓고 테스트
  const hotelTitle = Cookies.get("p_id");
  Cookies.set("overview", property[0].P_OVERVIEW);
  useEffect(() => {
    const getHotelList = async () => {
      const hotel = {
        P_ID: hotelTitle,
      };
      const response = await hotelDetailDB(hotel);
      setProperty(response.data);
      console.log(response.data);
    };
    getHotelList();
  }, [setProperty]);
  console.log(property);

  return (
    <>
      <HeaderNav1 />
      <HeaderNav2 />
      <div className="refBtn">
        <Button variant="outline-success" onClick={onMoveToAvailability}>
          옵션정보
        </Button>
        <Button variant="outline-success" onClick={onMoveToFacilities}>
          시설
        </Button>{" "}
        <Button variant="outline-success" onClick={onMoveToPolicies}>
          정책
        </Button>{" "}
        <Button variant="outline-info" onClick={handleShow}>
          고객후기를 확인하세요!
        </Button>
        <Offcanvas
          show={show}
          onHide={handleClose}
          style={{ width: "70%" }}
          placement="end"
        >
          <OffcanvasBody>
            <HotelReview property={property} handleClose={handleClose} />
          </OffcanvasBody>
        </Offcanvas>
      </div>

      <HotelInformation row={property[0]} />

      {/* 이동할 컴포넌트에 ref로 넘겨준다 */}
      <div ref={availabilityRef}>
        <HotelAvailabilityHeader />
      </div>
      {/* 호텔 데이터 받아오는 부분 */}
      <HotelAvailabilityRow row={property} />
      <div ref={reviewRef}></div>
      <div ref={facilitiesRef}>
        <HotelFacilities row={property[0]} />
      </div>
      <div ref={policiesRef}>
        <HotelPolicies row={property[0]} />
      </div>
      <Footer />
    </>
  );
};

export default HotelPage;

const Rating = styled.button`
  background-color: #003580;
  margin-left: 30px;
  color: white;
  padding: 5px;

  font-weight: bold;
  border: none;
`;

const StyledOffcanvasTitle = styled(Offcanvas.Title)`
  margin-left: 10px;
`;
