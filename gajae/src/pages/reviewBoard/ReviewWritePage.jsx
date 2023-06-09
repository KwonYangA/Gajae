import React, { useEffect, useRef } from "react";
import { Custom_btn, Hr, Title } from "../../style/FormStyle";
import HeaderNav1 from "../../components/header/HeaderNav1";
import Footer from "../../components/footer/Footer";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reviewInsertDB } from "../../service/reviewboardLogic";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUpload from "../../components/review/ImageUpload";
import ReviewScore from "../../components/review/ReviewScore";
import Swal from "sweetalert2";

/**
 *
 * @returns  글쓰기 페이지
 */
const ReviewWritePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); //사용자가 입력한 제목 담기
  const [reviewgood, setReviewgood] = useState(""); //사용자가 입력한 내용 담기
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageBad, setErrorMessageBad] = useState("");
  const [reviewbad, setReviewbad] = useState("");
  const [service, setService] = useState(0);
  const [facility, setFacility] = useState(0);
  const [clean, setClean] = useState(0);
  const [cost, setCost] = useState(0);
  const [location, setLocation] = useState(0);
  const textareaRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const r_number = urlParams.get("r_number");

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleGood = (value) => {
    setReviewgood(value);
  };

  const handleBad = (value) => {
    setReviewbad(value);
  };

  const handleReviewScore = useCallback(
    (setter) => (value) => {
      setter(Number(value));
    },
    []
  );
  const getImage = (imageUrl) => {
    setImageUrl(imageUrl);
    console.log(imageUrl);
  };

  const reviewInsert = async () => {
    if (
      !title ||
      !reviewgood ||
      !reviewbad ||
      !service ||
      !facility ||
      !clean ||
      !cost ||
      !location
    ) {
      Swal.fire({
        title: "모든 항목을 작성해주세요.",
        icon: "error",
      });
      return;
    }
    const review = {
      REVIEW_NUMBER: 0,
      R_NUMBER: r_number,
      REVIEW_TITLE: title,
      REVIEW_GOOD: reviewgood,
      REVIEW_BAD: reviewbad,
      REVIEW_DATE: 0,
      REVIEW_PHOTO: imageUrl,
      REVIEW_SERVICE: service,
      REVIEW_FACILITY: facility,
      REVIEW_CLEAN: clean,
      REVIEW_COST: cost,
      REVIEW_LOCATION: location,
    };
    const res = await reviewInsertDB(review);
    console.log(res.data);
    navigate("/mypage/review");
  };

  const handleInputBlur = () => {
    if (reviewgood.length <= 20) {
      setErrorMessage("20자 이상 입력하세요.");
    } else if (reviewgood.length > 100) {
      setErrorMessage("100자 이하로 입력하세요.");
    } else {
      setErrorMessage("");
    }
  };

  const handleInputBlurBad = () => {
    if (reviewbad.length <= 20) {
      setErrorMessageBad("20자 이상 입력하세요.");
    } else if (reviewgood.length > 100) {
      setErrorMessageBad("100자 이하로 입력하세요.");
    } else {
      setErrorMessageBad("");
    }
  };

  return (
    <>
      <HeaderNav1 />
      <ContainerDiv>
        <TopDiv style={{ backgroundColor: "white" }}>
          <span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon="fa-solid fa-door-open" /> &nbsp;&nbsp;
            다녀왔던 장소에 대한 팁이 있다면? 최근 여행을 평가해주세요
          </span>
        </TopDiv>
        <HeaderDiv>
          <Title>Review</Title>
        </HeaderDiv>
        <ContentDiv>
          <FormDiv>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "3px",
              }}
            >
              <h5>제목</h5>
              <Custom_btn type="button" onClick={reviewInsert}>
                글쓰기
              </Custom_btn>
            </div>
            <Textarea
              id="dataset-title"
              type="text"
              maxLength="50"
              placeholder="제목을 입력하세요."
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid lightGray",
                marginBottom: "3px",
              }}
              onChange={(e) => {
                handleTitle(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            />
            <h5>상세내용</h5>
            <hr style={{ margin: "10px 0px 20px 0px" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <h6>
                <i className="fa-regular fa-face-smile"></i>&nbsp;&nbsp; 좋았던
                점
              </h6>
              <h6>20/100</h6>
            </div>
            <Textarea
              id="dataset-good"
              ref={textareaRef}
              maxLength="50"
              placeholder="이용하신 상품의 자세한 리뷰를 남겨주세요."
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid lightGray",
                marginBottom: "5px",
              }}
              onChange={(e) => {
                handleGood(e.target.value);
              }}
              onBlur={handleInputBlur}
            />
            <ErrorDiv style={{ marginTop: "5px" }}>{errorMessage}</ErrorDiv>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
                marginTop: "10px",
              }}
            >
              <h6>
                <i className="fa-regular fa-face-frown"></i>&nbsp;&nbsp; 아쉬운
                점
              </h6>
              <h6>20자 이상</h6>
            </div>
            <Textarea
              id="dataset-bad"
              ref={textareaRef}
              maxLength="50"
              placeholder="이용하신 상품의 자세한 리뷰를 남겨주세요."
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid lightGray",
                marginBottom: "10px",
              }}
              onChange={(e) => {
                handleBad(e.target.value);
              }}
              onBlur={handleInputBlurBad}
            />
            <ErrorDiv>{errorMessageBad}</ErrorDiv>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            ></div>
            <div
              style={{
                display: "block",
                border: "1px solid lightGray",
                borderRadius: "10px",
                minHeight: "60px",
                padding: "5px",
                transition: "height 0.3s ease-in-out",
                backgroundColor: "white",
              }}
            >
              {/*----------------------------------첨부파일-------------------------------------*/}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  alignItems: "center",
                }}
              ></div>
              <ImageUpload getImage={getImage} />

              
              <hr />
              {/*--------------------------------리뷰점수-------------------------------------  */}
              <ReviewScore
                handleReviewScore={handleReviewScore}
                service={service}
                setService={setService}
                facility={facility}
                setFacility={setFacility}
                clean={clean}
                setClean={setClean}
                cost={cost}
                setCost={setCost}
                location={location}
                setLocation={setLocation}
              />
            </div>
          </FormDiv>
        </ContentDiv>
      </ContainerDiv>
      <Footer />
    </>
  );
};

export default ReviewWritePage;

const TopDiv = styled.div`
  text-align: left;
  width: 850px;
  margin: 40px 0 10px 0;
  border: 1px solid;
  padding: 10px;
  backgroundcolor: white;
`;
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "KOTRA_GOTHIC";
  margin-bottom: 50px;
  align-items: center;
  background-color: #f5f5f5;
`;

const ContentDiv = styled.div`
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const FormDiv = styled.div`
  display: flex;
  width: 850px;
  flex-direction: column;
  border-radius: 20px;
  padding: 10px;
  justify-content: space-between;
`;

const HeaderDiv = styled.div`
  display: flex;
  width: 90%;
  margin-top: 25px;
  justify-content: center;
  margin-bottom: 10px;
`;
const ErrorDiv = styled.div`
  color: red;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid lightGray;
  padding: 5px;
  &:focus {
    outline: 2px solid #2e9afe;
  }
`;

const TipDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: column;
  font-family: "KOTRA_GOTHIC";
  justify-content: space-between;
  align-items: center; /* 수평 중앙 정렬 */
  width: 90%;
  margin: 30px;
  border: 1px solid #e7e7e7;
`;
