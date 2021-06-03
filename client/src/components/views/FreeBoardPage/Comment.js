import React, { useState, useEffect } from "react";
import {
  Avatar,
  Col,
  Typography,
  Row,
  Button,
  Form,
  message,
  Input,
  Card,
  Table,
  Space,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Axios from "axios";

const { TextArea } = Input;

function Comment(props) {
  const freeboardId = props.postId;
  const variable = { freeboardId: freeboardId };

  const user = useSelector((state) => state.user.userData);

  const [userName, setUserName] = useState("초기값");

  const [commentsdata, setcommentsdata] = useState([]);
  const [commentValue, setcommentValue] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
    Axios.post("/api/freeboard/getcomments", variable).then((response) => {
      if (response.data.success) {
        console.log("코멘트 데이터: ", response.data.commentsData);
        setcommentsdata(response.data.commentsData);
      } else {
        alert("실패했습니다.");
      }
    });
  }, [user]);

  const renderComments = commentsdata.map((comment, index) => {
    return (
      <li key={index}>
        <span>{comment.name}</span>

        <p>{moment(comment.time).format("LLLL")} </p>

        <p>{comment.content} </p>
        <br />
      </li>
    );
  });

  const onhandleChange = (event) => {
    setcommentValue(event.currentTarget.value);
  };

  const onSumit = (e) => {
    e.preventDefault();
    console.log("clicked");
    const variables = {
      content: commentValue,
      name: user.name,
      postId: freeboardId,
      image: user.image,
      id:user._id,
      time: Date.now(),
    };
    console.log(variables);

    Axios.post("/api/freeboard/savecomment", variables).then((response) => {
      if (response.data.success) {
        console.log("comment : ", response.data);
        setcommentValue("");
        //props.refreshFunction(response.data.recoment);
      } else {
        alert("커멘트를 저장하지 못했습니다.");
      }
    });

    window.location.reload(false);
  };

  const onDelete = (e) => {
    e.preventDefault();
    console.log("del");
    const variables = {
      postId: freeboardId,
    };

    Axios.post("/api/freeboard/delpost", variables).then((response) => {
      if (response.data.success) {
        //alert("삭제를 완료 하였습니다.");
        window.location.href = "/freeboard";
      } else {
        alert("커멘트를 저장하지 못했습니다.");
      }
    });
  };

  const testBt = (e) => {
    e.preventDefault();
    props.name === "user." ? alert("삭제 가능") : alert("불가능");
  };

  //setUserName(user.userData.name);

  return (
    <>
      <p>댓글</p>
      <Row gutter={16}>{renderComments}</Row>

      <form>
        <TextArea onChange={onhandleChange} value={commentValue} rows={4} />
        <Button type="primary" size="large" onClick={onSumit}>
          확인
        </Button>
      </form>
      <br />
      {props.name === userName ? (
        <Button danger onClick={onDelete}>
          삭제
        </Button>
      ) : (
        <p>삭제불가</p>
      )}
    </>
  );
}

export default Comment;
