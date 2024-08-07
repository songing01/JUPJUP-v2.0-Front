import React from "react";
import styled from "styled-components";

import map_grey from "../../assets/icons/map_grey.svg";
import profile_grey from "../../assets/icons/profile_grey.svg";
import plog_grey from "../../assets/icons/plog_grey.svg";

const NavBar = ({ isNoGap = false }) => {
  return (
    <Gap $isNoGap={isNoGap}>
      <Wrapper>
        <img src={map_grey} />
        <img src={plog_grey} />
        <img src={profile_grey} />
      </Wrapper>
    </Gap>
  );
};

export default NavBar;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  background-color: var(--white);

  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 57px;
  padding: 3px 20px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.04),
    0px -2px 20px 0px rgba(0, 0, 0, 0.06);
`;

const Gap = styled.div`
  margin-bottom: ${(props) => (props.$isNoGap ? "0px" : "101px")};
`;
