import React, { useEffect, useState } from "react";
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
} from "antd";
import moment from "moment";
import Axios from "axios";
import { useSelector } from "react-redux";

import { withRouter } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

function NewPost() {
  const user = useSelector((state) => state.user);

  const [postTitle, setpostTitle] = useState("");
  const [Description, setDescription] = useState("");

  const onTitleChange = (e) => {
    setpostTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onSumit = (e) => {
    e.preventDefault();
    console.log("clicked");
    const variable = {
      title: postTitle,
      description: Description,
      name: user.userData.name,
      id: user.userData._id,
      time: Date.now(),
    };

    console.log(variable);
    if (postTitle && Description) {
      Axios.post("/api/freeboard/savepost", variable).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          message.success("성공적으로 업로드를 했습니다.");
          setTimeout(() => console.log("after"), 3000);
          window.location.reload(true);
          window.location.href = "freeboard";
        } else {
          alert("실패하셨습니다.");
        }
      });
    }
    else{
      alert('반 컨을 모두 입력해주십시오');
    }
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>새글 작성</Title>
      <hr />
      <div
        style={{
          width: "85%",
          margin: "2rem auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title level={3}>제목</Title>
        <TextArea
          onChange={onTitleChange}
          value={postTitle}
          rows={1}
          style={{ marginBottom: "20px" }}
        />
        <br />
        <Title level={3}>내용</Title>
        <TextArea
          onChange={onDescriptionChange}
          value={Description}
          rows={8}
          style={{ marginBottom: "20px" }}
        />

        <Button
          type="primary"
          size="large"
          onClick={onSumit}
          style={{ margin: "auto"}}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

export default NewPost;
