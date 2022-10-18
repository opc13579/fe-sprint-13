import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  background-color: rgb(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
`;

const ModalBox = styled.div`
  background-color: white;
  border: 1px solid #e1e6e8;
  border-radius: 10px;
  position: absolute;
  top: calc(40%);
  left: calc(50% - 140px);
  width: 280px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalMsgBox = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  margin: 12px 12px;
`;

const ModalBtnBox = styled.div`
  display: flex;
  justify-content: space-around;
  height: 52px;
  cursor: pointer;
`;

const ModalCancleBtn = styled.div`
  text-align: center;
  line-height: 52px;
  width: 50%;
  color: #c7c8ce;
  &:hover {
    color: #5d5fef;
  }
  border-top: 2px solid #e1e6e8;
  border-right: 1px solid #e1e6e8;
`;
const ModalConfirmBtn = styled.div`
  text-align: center;
  line-height: 52px;
  width: 50%;
  color: #c7c8ce;
  &:hover {
    color: #5d5fef;
  }
  border-top: 2px solid #e1e6e8;
  border-left: 1px solid #e1e6e8;
`;

function Modal({ msg, onClickCancle, onClickConfirm }) {
  return (
    <ModalBackground>
      <ModalBox>
        <ModalMsgBox>
          {msg.split("\n").map((text, idx) => (
            <div key={idx}>{text}</div>
          ))}
        </ModalMsgBox>
        <ModalBtnBox>
          <ModalCancleBtn onClick={onClickCancle}>취소</ModalCancleBtn>
          <ModalConfirmBtn onClick={onClickConfirm}>확인</ModalConfirmBtn>
        </ModalBtnBox>
      </ModalBox>
    </ModalBackground>
  );
}

export default Modal;