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
import "./BigthreePage.css";

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
      <Col key={index} lg={6}  xs={24}>
        <div
          className={"dfd_" + (index + 1)}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "50%",
            border: "1px solid gray",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <p align="center">{index + 1}등</p>

          <p align="center" style={{ flexGrow: "1" }}>
            <Avatar size={64} src={bigthree.image}></Avatar>
          </p>

          <p align="center" style={{ flexGrow: "1" }}>
            <b>이름 :</b> {bigthree.name}
          </p>
          <p align="center">
            <b>데드리프트 :</b> {bigthree.deadlift} kg
          </p>
          <p align="center">
            <b>벤치프레스 :</b> {bigthree.benchpress} kg
          </p>
          <p align="center">
            <b>스쿼트 :</b> {bigthree.squat} kg
          </p>
          <p align="center">
            <b>합 :</b> {bigthree.sum} kg{" "}
          </p>
          <p align="center" style={{ marginLeft: "" }}>
            <b>날짜 : </b>
            {moment(bigthree.time).format("l")}
          </p>
        </div>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>3대측정 순위</Title>
      <hr />

      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}
export default withRouter(BigthreePage);
