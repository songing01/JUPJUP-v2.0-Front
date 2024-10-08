import React from "react";
import styled from "styled-components";
import right from "../../../assets/mypage/right.svg";
import Item from "../../list/Item";

import { useNavigate } from "react-router-dom";

const New = ({ newPost }) => {
  const navigate = useNavigate();
  return (
    newPost && (
      <Wrapper>
        <div className="title">최근 성사된 플로깅</div>
        <>
          <div className="divider" />
          <Item item={newPost} />
          <div className="divider" />
        </>

        <div
          className="review-btn"
          onClick={() => navigate("/mypage/myplogging")}
        >
          플로깅 리뷰하기
          <img src={right} />
        </div>
      </Wrapper>
    )
  );
};

export default New;

const Wrapper = styled.div`
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  .review-btn {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: end;

    color: var(--grey500);

    img {
      margin-top: 1px;
    }
  }
`;
