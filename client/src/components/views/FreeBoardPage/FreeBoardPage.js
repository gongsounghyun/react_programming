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
  Table,
  Space,
} from "antd";
import moment from "moment";
import Axios from "axios";
import { useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { NativeError } from "mongoose";
import comment from "./Comment";

const { Title } = Typography;
const { Column, ColumnGroup } = Table;

function FreeBoardPage() {
  const [postsData, setpostsData] = useState([]);
  useEffect(() => {
    Axios.get("/api/freeboard/getposts").then((response) => {
      if (response.data.success) {
        console.log(response.data.postData);
        setpostsData(response.data.postData);
      } else {
        alert("실패했습니다.");
      }
    });
  }, []); //
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>자유 게시판</Title>
      <hr />
      <Table dataSource={postsData}>
        <Column
          title="제목"
          dataIndex="title"
          key="title"
          render={(text, record) => (
            <a href={`/freeboard/${record.freeboardId}`}>{text}</a>
          )}
          width="800px"
        />
        <Column title="글쓴이" dataIndex="name" key="name" />

        <Column
          title="작성일"
          dataIndex="time"
          render={(text, record) => (
            <span>{moment(text).format("YYYY년 MM월 DD일")}</span>
          )}
          key="time"
        />
      </Table>
      <br/>
     
      <Link to="/newpost">
        <Button type="primary" size="large">
          글쓰기
        </Button>
      </Link>
    </div>
  );
}

export default FreeBoardPage;
