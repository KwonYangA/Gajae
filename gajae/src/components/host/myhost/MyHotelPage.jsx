import {
  faComment,
  faHistory,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Nav } from "react-bootstrap";
import Footer from "../../footer/Footer";
import {
  MSCLeftDIV,
  MSCRightDIV,
  MSContainer,
  MyPageLinkMove,
  SignOutButton,
} from "./styled-mypage";
import HostHeaderNav from "../HostHeaderNav";
import {
  MySettingsFlexByRow,
  MySettingsPageTitle,
} from "../../../pages/mypage/styled-mypage";
import MyHotelList from "./MyHotelList";
import { useNavigate } from "react-router-dom";

const MyHotelPage = () => {
  const navigate = useNavigate();
  const hostId = localStorage.getItem("hostId");
  console.log(hostId);
  const signOut = () => {
    console.log("signOut");
    window.localStorage.clear();
    navigate("/host");
  };
  return (
    <>
      <HostHeaderNav />
      <MSContainer className="container">
        <MSCLeftDIV>
          {" "}
          <Nav defaultActiveKey="/home" className="flex-column">
            <MyPageLinkMove to="/host/myhostpage">
              <span style={{ paddingRight: "5px" }}>
                <i class="fa-solid fa-minus"></i>
              </span>
              메인
            </MyPageLinkMove>
            <MyPageLinkMove to="/host/myhotelpage">
              <span style={{ paddingRight: "5px" }}>
                <FontAwesomeIcon icon={faHistory} />
              </span>
              등록내역
            </MyPageLinkMove>
            <MyPageLinkMove to="/host/myhotelreview">
              <span style={{ paddingRight: "5px" }}>
                <FontAwesomeIcon icon={faComment} />
              </span>
              내 호텔후기
            </MyPageLinkMove>

            <SignOutButton onClick={signOut}>
              <span style={{ paddingRight: "5px" }}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
              로그아웃
            </SignOutButton>
          </Nav>
        </MSCLeftDIV>
        <MSCRightDIV>
          <MySettingsFlexByRow>
            <MySettingsPageTitle>
              <MyHotelList hostId={hostId} />
            </MySettingsPageTitle>
          </MySettingsFlexByRow>
        </MSCRightDIV>
      </MSContainer>
      <Footer />
    </>
  );
};

export default MyHotelPage;
