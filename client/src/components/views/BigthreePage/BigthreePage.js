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
const { Meta } = Card;

function BigthreePage(props) {
  const [Bigthrees, setBigthrees] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user);


  useEffect(() => {
    // dom이 로드되자마자 무엇을 할껏인지
    //console.log(user);
    Axios.get("/api/bigthree/getBigthrees").then((response) => {
      if (response.data.success) {
        setBigthrees(response.data.postData);
      } else {
        alert("3대 측정 가져오기를 실패했습니다.");
      }
    });

    //console.log("유저이펙트:", Bigthrees);
  }, []); // []안이 비어있으면 업데이트 될때 한번만 실행 아니면 계속 실행

  const renderCards = Bigthrees.map((bigthree, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Meta // 동그랗게 나오는 유저이미지
          avatar={<Avatar src={bigthree.image} />}
        />
        <span>{bigthree.name} </span>
        <span></span>
        <br />
        <span style={{ marginLeft: "3rem" }}>
          {" "}
          데드리프트: {bigthree.deadlift} kg
        </span>
        <br />
        <span style={{ marginLeft: "3rem" }}>
          {" "}
          벤치프레스: {bigthree.benchpress} kg
        </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> 스쿼트 : {bigthree.squat} kg</span>
        <br />

        <span style={{ marginLeft: "3rem" }}> 합: {bigthree.sum} kg </span>
        <br />

        <span style={{ marginLeft: "3rem" }}> Date: {bigthree.time}  </span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>3대측정 순위</Title>
      <hr />
      <div>{localStorage.getItem("userId")}</div>
      <Button>버튼</Button>
      <br />
      <hr />
      <br />

      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}
export default withRouter(BigthreePage);
