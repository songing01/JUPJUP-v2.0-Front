import React, { useEffect, useState } from "react";
import styled from "styled-components";
import bookmark from "../../assets/post/bookmark.svg";
import bookmarkpurple from "../../assets/post/bookmarkpurple.svg";
import bookmarkblack from "../../assets/post/bookmarkblack.svg";
import right from "../../assets/post/right.svg";
import useFetch from "../../services/hooks/useFetch";
import {
  postCreateBookmark,
  postDeleteBookmark,
} from "../../services/api/post";

const Footer = ({
  joinedMemberCount,
  maxMember,
  postId,
  dueDate,
  isJoined = true,
  isFail = true,
  isSuccess,
  isHearted = false,
  refetch,
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  //북마크 토글 요청
  const { fetchData: createBookmark } = useFetch(postCreateBookmark);
  const { fetchData: deleteBookmark } = useFetch(postDeleteBookmark);

  //남은 시간 계산 타이머
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(dueDate) - new Date();
      let timeLeft = "";

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);

        timeLeft = `${days.toString().padStart(2, "0")}일 ${hours
          .toString()
          .padStart(2, "0")}시간 ${minutes.toString().padStart(2, "0")}분 `;
      }

      return timeLeft;
    };

    const updateTimer = () => {
      const time = calculateTimeLeft();
      setTimeLeft(time);

      if (time) {
        setTimeout(updateTimer, 1000); // Update every second
      }
    };

    updateTimer();

    return () => clearTimeout(updateTimer);
  }, [dueDate]);

  const toggleBookmark = () => {
    if (isHearted) {
      deleteBookmark(postId);
    } else {
      createBookmark(postId);
    }

    setTimeout(() => {
      refetch(); //좋아요 반영된 정보로 업데이트
    }, 150); // 0.15초 딜레이
  };

  return (
    <Gap>
      <Wrapper $isJoined={!isFail && isJoined}>
        <div className="top">
          {isFail ? (
            <div className="time">모집 인원 미달</div>
          ) : (
            <>
              {isSuccess ? (
                <div className="time">모집 완료</div>
              ) : (
                <div className="time">모집 마감까지 {timeLeft}</div>
              )}
            </>
          )}
          <div className="btns">
            {isHearted ? (
              <>
                {!isFail && isJoined ? (
                  <img src={bookmarkblack} onClick={toggleBookmark} />
                ) : (
                  <img src={bookmarkpurple} onClick={toggleBookmark} />
                )}
              </>
            ) : (
              <img src={bookmark} onClick={toggleBookmark} />
            )}
            {!isFail && (
              <>
                {isJoined ? (
                  <div className="btn participate">신청 완료</div>
                ) : (
                  <div className="btn">참여 신청</div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="bottom">
          <div className="people">
            {joinedMemberCount} / {maxMember} 참여중
          </div>
          <img src={right} />
        </div>
      </Wrapper>
    </Gap>
  );
};

export default Footer;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 88px;
  flex-shrink: 0;
  background: ${(props) =>
    props.$isJoined ? "var(--main)" : "rgba(9, 9, 10, 0.8)"};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px 20px;
  gap: 2px;
  color: var(--white);

  .time {
    font-size: 18px;
    font-weight: 600;
  }

  .btn {
    border-radius: 4px;
    background: var(--main);
    padding: 8px 10px;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }

  .participate {
    background: var(--light);
    color: var(--main);
  }

  .btns {
    display: flex;
    gap: 8px;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bottom {
    display: flex;
    gap: 8px;

    img {
      margin-top: 1px;
    }
  }
`;

const Gap = styled.div`
  margin-bottom: 88px;
`;
