import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";
import Info from "../../components/user/mypage/Info";
import Btns from "../../components/user/mypage/Btns";
import Stat from "../../components/user/mypage/Stat";
import New from "../../components/user/mypage/New";
import NavBar from "../../components/common/NavBar";
import useGetInitialData from "../../services/hooks/useGetInitialData";
import {
  memberGetMyProfile,
  memberGetUserStat,
} from "../../services/api/member";
import { postGetCompletePost } from "../../services/api/post";

const MyPage = () => {
  const id = localStorage.getItem("memberId");

  const { data: info, refetch: refetchInfo } =
    useGetInitialData(memberGetMyProfile);
  const { data: newPost, refetch: refetchNewPost } =
    useGetInitialData(postGetCompletePost);
  const { data: stat, refetch: refetchStat } = useGetInitialData(
    memberGetUserStat,
    id
  );

  useEffect(() => {
    if (info == undefined) {
      refetchInfo();
    }
    if (newPost == undefined) {
      refetchNewPost();
    }
    if (stat == undefined) {
      refetchStat();
    }
  }, [info, newPost, stat]);

  return (
    <>
      <Header title="마이페이지" isHome={true} isNoti={true} />

      <Wrapper>
        {info && (
          <>
            <Info info={info} />
            <div className="divider" />
            <Btns />
            <div className="divider" />
          </>
        )}

        {newPost && <New newPost={newPost} />}

        <Bottom>
          <div className="title gap">내 통계</div>
          <div className="divider" />
          {stat && <Stat stat={stat} />}
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
  position: relative;
  height: calc(100vh - 109px);

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
  bottom: 0px;
`;
