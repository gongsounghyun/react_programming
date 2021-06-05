import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import Axios from "axios";
import Comment from "./Comment";
import moment from "moment";

const { Title } = Typography;

function FreeBoardDetailPage(props) {
  const freeboardId = props.match.params.freeboardId;
  const variable = { freeboardId: freeboardId };
  const [postsData, setpostsData] = useState({});

  useEffect(() => {
    Axios.post("/api/freeboard/getpost", variable).then((response) => {
      if (response.data.success) {
        const data = response.data.postData[0];
        console.log("게시판 데이터 : ", data);
        setpostsData(data);
        console.log(postsData);
      } else {
        alert("실패했습니다.");
      }
    });
  }, []);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>{postsData.title}</Title>
      <hr />
      <div>
        <p style={{ textAlign: "right" }}>
          <b>작성자:</b> {postsData.name} 작성 시간:
          {moment(postsData.time).format("LLLL")}
        </p>
        <div style={{ margin: "1rem auto" }}>{postsData.description}</div>
        <hr />
        <Comment postId={freeboardId} name={postsData.name} />
      </div>
    </div>
  );
}

export default FreeBoardDetailPage;
