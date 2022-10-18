import React, { useState } from "react";
import styled from "styled-components";

import Modal from "../components/Modal";

// ToDo 전체
const Wrapper = styled.div`
  background-color: white;
  width: 90%;
  height: auto;
  min-width: 360px;
  max-width: 768px;
  margin: 40px auto;
  padding: 20px 30px;
`;
// 최상단 헤드 ToDO List App
const Head = styled.div`
  font-size: 40px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 30px;
`;
// 입력박스
const InputBox = styled.div`
  border: 1px solid #c7c8ce;
  border-radius: 10px;
  width: 100%;
  height: 45px;
  padding-left: 15px;
  padding-right: 30px;
  display: flex;
`;
// 입력창
const Input = styled.input`
  border: 0px;
  outline: none;
  font-size: 20px;
  width: 100%;
`;
// Enter 아이콘
const EnterIcon = styled.i.attrs({
  className: "bi bi-arrow-return-right",
})`
  font-size: 25px;
  margin-top: 3px;
  margin-right: 10px;
  color: #888e95;
  cursor: pointer;
`;
// Trash 아이콘
const TrashIcon = styled.i.attrs({
  className: "bi bi-trash-fill",
})`
  font-size: 25px;
  color: #48484d;
  cursor: pointer;
`;
// 선택 삭제 버튼
const DeleteSelectedBtn = styled.button`
  background-color: #6c757d;
  border-radius: 5px;
  border: 0px;
  color: white;
  width: 130px;
  height: 30px;
  &:hover {
    background-color: #5a6268;
  }
  margin-right: 15px;
`;
// 전체 삭제 버튼
const ClearAllBtn = styled.button`
  background-color: #6c757d;
  border-radius: 5px;
  border: 0px;
  color: white;
  width: 80px;
  height: 30px;
  &:hover {
    background-color: #5a6268;
  }
`;
// 구분 바
const Bar = styled.hr`
  border: 1px solid rgb(0, 0, 0, 0.1);
  margin: 10px 0px;
  display: ${(props) => (props.listCnt === 0 ? "none" : "")};
`;
// List 라인
const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
`;
// checkbox + todo name
const ListBox = styled.div`
  display: flex;
  align-items: center;
`;
// 체크박스
const CheckBox = styled.input`
  margin-right: 20px;
  width: 15px;
  height: 15px;
`;
// 굵게
const B = styled.b`
  font-weight: 800;
`;

function Main() {
  const [todo, setTodo] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [deleteType, setDeleteType] = useState("");
  const [todoList, setTodoList] = useState([
    { name: "Exercise", checked: false },
    { name: "Study", checked: false },
    { name: "Shopping", checked: false },
  ]);

  const onChangeInput = (e) => {
    setTodo(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo(todo);
      setTodo("");
    }
  };

  const addTodo = (todo) => {
    const newTodo = { name: todo, checked: false };
    setTodoList(todoList.concat(newTodo));
  };

  const onClickCheckAll = () => {
    setTodoList(todoList.map((todo) => ({ ...todo, checked: !checkAll })));

    setCheckAll(!checkAll);
  };

  const onChangeCheck = (idx) => {
    setTodoList(
      todoList.map((todo, id) =>
        id === idx ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const deleteTodo = (idx) => {
    setTodoList(todoList.filter((todo, id) => id !== idx));
  };

  const deleteSelected = () => {
    setShowModal(true);
    setDeleteType("Selected");
    setModalMsg("선택된 항목을\n삭제하시겠습니까?");
  };

  const clearAll = () => {
    setShowModal(true);
    setDeleteType("All");
    setModalMsg("전체 항목을\n삭제하시겠습니까?");
  };

  const onClickCancle = () => {
    setShowModal(false);
  };

  const onClickConfirm = () => {
    setShowModal(false);
    setCheckAll(false);

    if (deleteType === "Selected") {
      setTodoList(todoList.filter((todo) => todo.checked === false));
    } else if (deleteType === "All") {
      setTodoList([]);
    }
  };

  return (
    <Wrapper>
      {showModal && (
        <Modal
          msg={modalMsg}
          onClickCancle={onClickCancle}
          onClickConfirm={onClickConfirm}
        ></Modal>
      )}
      <Head>ToDo List App</Head>
      <InputBox>
        <EnterIcon></EnterIcon>
        <Input
          name="todo"
          type="text"
          value={todo}
          placeholder="Please enter your ToDo List"
          onChange={onChangeInput}
          onKeyPress={onKeyPress}
        ></Input>
      </InputBox>
      <ListWrapper>
        <ListBox>
          <CheckBox
            type="checkbox"
            onChange={onClickCheckAll}
            checked={checkAll}
          />
          <B>List</B>
        </ListBox>
      </ListWrapper>
      <Bar></Bar>
      {todoList.map((item, idx) => (
        <ListWrapper key={idx}>
          <ListBox>
            <CheckBox
              name=""
              type="checkbox"
              onChange={() => onChangeCheck(idx)}
              checked={todoList[idx].checked}
            />
            {item.name}
          </ListBox>
          <TrashIcon onClick={() => deleteTodo(idx)}></TrashIcon>
        </ListWrapper>
      ))}
      <Bar listCnt={todoList.length}></Bar>
      <ListWrapper>
        <B>Completed Todos : {todoList.length}</B>
        <ListBox>
          <DeleteSelectedBtn onClick={deleteSelected}>
            Delete selected
          </DeleteSelectedBtn>
          <ClearAllBtn onClick={clearAll}>Clear all</ClearAllBtn>
        </ListBox>
      </ListWrapper>
    </Wrapper>
  );
}

export default Main;