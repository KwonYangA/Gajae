import React from 'react';
import './MainRecommandLoc.css';

const MainRecommandLoc = () => {
  return (
    <>
      <div className="space" style={{ height: 30 }}></div>
      <div className="pList">
        <div className="pListItem">
          <img
            src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
            alt=""
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>Hotels</h1>
          </div>
        </div>
        <div className="pListItem">
          <img
            src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
            alt=""
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>Apartments</h1>
            <h2>2331 hotels</h2>
          </div>
        </div>
        <div className="pListItem">
          <img
            src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
            alt=""
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>Villas</h1>
            <h2>2331 hotels</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainRecommandLoc;
