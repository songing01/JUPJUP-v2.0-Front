import React from "react";
import styled from "styled-components";

import xgrey from "../../assets/post/xgrey.svg";
import status1 from "../../assets/map/status1.svg";
import status2 from "../../assets/map/status2.svg";
import status3 from "../../assets/map/status3.svg";
import colorstatus1 from "../../assets/map/colorstatus1.svg";
import colorstatus2 from "../../assets/map/colorstatus2.svg";
import colorstatus3 from "../../assets/map/colorstatus3.svg";

import LongBtn from "../common/LongBtn";
import right from "../../assets/post/right.svg";

const Drawer = ({ setIsOpen }) => {
  return (
    <Bg
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <Wrapper>
        <img
          src={xgrey}
          className="btn"
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <div className="name">쓰레기통 이름</div>
        <div className="address"> 성동구 00로 00길 0-00</div>

        <div className="imgs">
          <img className="img" src={""} />
          <img className="img" src={""} /> <img className="img" src={""} />
          <img className="img" src={""} />
        </div>

        <div className="review">관리 상태 리뷰</div>
        <Status>
          <div className="status">
            <img src={status1} />
            <div className="text">관리 필요</div>
            <div className="cnt">10</div>
          </div>

          <div className="status">
            <img src={status2} />
            <div className="text">보통</div>
            <div className="cnt">10</div>
          </div>

          <div className="status">
            <img src={status3} />
            <div className="text">우수</div>
            <div className="cnt">10</div>
          </div>
        </Status>
      </Wrapper>

      <Bottom>
        <div className="inquiry">
          민원 접수하기
          <img className="right" src={right} />
        </div>
        <LongBtn text={"완료"} />
      </Bottom>
    </Bg>
  );
};

export default Drawer;

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  position: relative;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;

  .name {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  .review {
    margin-top: 50px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }

  .btn {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .address {
    margin-top: 4px;
    color: var(--grey500);
    text-align: center;
    font-size: 12px;
  }

  .imgs {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const Status = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 77px;

  .status {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .text {
    margin-top: 8px;
  }
`;

const Bottom = styled.div`
  padding-bottom: 40px;
  background-color: var(--white);

  color: var(--grey500);
  font-size: 12px;

  .inquiry {
    display: flex;
    gap: 4px;
    width: 100%;
    justify-content: center;
    margin-bottom: 12px;
  }

  .right {
    margin-top: 1px;
  }
`;

const Bg = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;
