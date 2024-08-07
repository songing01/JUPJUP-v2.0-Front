import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import Info from "../../components/user/mypage/Info";
import Btns from "../../components/user/mypage/Btns";
import Stat from "../../components/user/mypage/Stat";
import New from "../../components/user/mypage/New";
import NavBar from "../../components/common/NavBar";

const MyPage = () => {
  return (
    <>
      <Header title="마이페이지" isHome={true} isNoti={true} />
      <Wrapper>
        <Info />
        <div className="divider" />

        <Btns />
        <div className="divider" />

        <New />

        <Bottom>
          <div className="title gap">내 통계</div>
          <div className="divider" />
          <Stat />
          <div className="divider" />
        </Bottom>
      </Wrapper>

      <NavBar />
    </>
  );
};

export default MyPage;

const Wrapper = styled.div`
  padding: 0 20px;

  .divider {
    height: 1.2px;
    background-color: var(--grey300);
    width: 100%;
  }

  .title {
    color: var(--black);
    font-size: 18px;
    font-weight: 600;
  }

  .gap {
    margin-bottom: 8px;
  }
`;

const Bottom = styled.div`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  left: 0;
  bottom: 101px;
`;
