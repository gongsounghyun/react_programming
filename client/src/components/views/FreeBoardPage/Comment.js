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
  Popconfirm,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Axios from "axios";

const { TextArea } = Input;
const { Title, Text } = Typography;

function Comment(props) {
  const freeboardId = props.postId;
  const variable = { freeboardId: freeboardId };

  const user = useSelector((state) => state.user.userData);

  const [userName, setUserName] = useState("초기값");

  const [commentsdata, setcommentsdata] = useState([]);
  const [commentValue, setcommentValue] = useState("");

  const deleteComment = (docId) => {
    console.log("cickced", docId);

    Axios.post("/api/freeboard/delcomment", { docId: docId }).then(
      (response) => {
        if (response.data.success) {
          console.log("성공적으로 댓글을 삭제함");

          Axios.post("/api/freeboard/getcomments", variable).then(
            (response) => {
              if (response.data.success) {
                console.log("코멘트 데이터: ", response.data.commentsData);
                setcommentsdata(response.data.commentsData);
              } else {
                alert("실패했습니다.");
              }
            }
          );
        } else {
          console.log("댓글을 삭제 실패함");
        }
      }
    );
  };

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
      <div style={{ marginTop: "10px", borderBottom: "1px solid #9C9C9C" }}>
        <div style={{ display: "flex", backgroundColor: "" }}>
          <p style={{ flexGrow: "1", marginLeft: "10px" }}>
            <b>{comment.name}</b>
          </p>
          <p style={{ flexGrow: "1", marginRight: "10px", textAlign: "right" }}>
            {moment(comment.time).format("LLLL")}
          </p>
        </div>
        <p style={{ marginLeft: "10px" }}>{comment.content}</p>
        <br />
        <div align="right" style={{ marginBottom: "10px" }}>
          {comment.name === userName ? (
            <Popconfirm
              title="정말 삭제 하시겠습니까?"
              onConfirm={() => deleteComment(comment.commentId)}
            >
              <Button>삭제</Button>
            </Popconfirm>
          ) : (
            <></>
          )}
        </div>
      </div>
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
      id: user._id,
      time: Date.now(),
    };
    console.log(variables);

    Axios.post("/api/freeboard/savecomment", variables).then((response) => {
      if (response.data.success) {
        console.log("comment : ", response.data);
        setcommentValue("");
        //props.refreshFunction(response.data.recoment);

        Axios.post("/api/freeboard/getcomments", variable).then((response) => {
          if (response.data.success) {
            console.log("코멘트 데이터: ", response.data.commentsData);
            setcommentsdata(response.data.commentsData);
          } else {
            alert("실패했습니다.");
          }
        });
      } else {
        alert("커멘트를 저장하지 못했습니다.");
      }
    });
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

  return (
    <div>
      <Title level={4}>댓글</Title>
      <Row gutter={1}>{renderComments}</Row>

      <TextArea
        style={{ marginTop: "20px", marginBottom: "20px" }}
        onChange={onhandleChange}
        value={commentValue}
        rows={4}
      />
      <Button type="primary" size="large" onClick={onSumit}>
        댓글작성
      </Button>
      <div align="right" style={{}}>
        {props.name === userName ? (
          <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={onDelete}>
            <Button type="danger" size="large">
              삭제
            </Button>
          </Popconfirm>
        ) : (
          <p> </p>
        )}
      </div>
    </div>
  );
}

export default Comment;
