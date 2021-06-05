import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import {
  Calendar,
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  Typography,
  message,
} from "antd";
import moment from "moment";
import "./EatLogPage.css";

const { Title } = Typography;
const id = { idInfo: localStorage.getItem("userId") };

function CCalendar(props) {
  function onPanelChange(value, mode) {
    console.log(value);
  }

  function onSelect(value) {
    const selectedValue = moment(value).format("YYYY-MM-DD");
    console.log("선택한 값", selectedValue);
    props.setDay(selectedValue);
    props.refreshList(selectedValue);
  }
  return (
    <div
      className="site-calendar-demo-card"
      style={{
        width: "400px",
        border: "1px solid #f0f0f0",
        borderRadius: "40px",
        margin: "30px",
      }}
    >
      <Calendar
        fullscreen={false}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </div>
  );
}

function CEatLog(props) {
  const [foodName, setFoodName] = useState("");
  const [foodCal, setFoodCal] = useState("");

  const onClickSumit = () => {
    console.log(
      `음식 이름 ${foodName}, 칼로리 ${foodCal} 보내기 ${id.idInfo} `
    );

    const variable = {
      userId: id.idInfo,
      foodName: foodName,
      foodCal: foodCal,
      date: props.day,
    };

    console.log(variable);

    Axios.post("/api/eatlog/saveEatLog", variable).then((response) => {
      if (response.data.success) {
        console.log("saveEatLog 성공");
        message.success("추가되었습니다.");
      } else {
        console.log("saveEatLog 실패");
      }
    });
    setFoodName("");
    setFoodCal("");

    props.refreshList(props.day);
  };

  return (
    <div>
      <Form layout="inline">
        <Title level={4}>{props.day}</Title>
        <Form.Item label="음식이름">
          <Input
            onChange={(e) => setFoodName(e.currentTarget.value)}
            value={foodName}
            placeholder="음식이름을 입력하세요"
          />
        </Form.Item>
        <Form.Item label="칼로리">
          <Input
            onChange={(e) => setFoodCal(e.currentTarget.value)}
            value={foodCal}
            placeholder="칼로리를 입력하세요"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onClickSumit}>
            추가
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

function CEatLogTable(props) {
  function deleteEatLog(docId) {
    const variable = {
      userId: id.idInfo,
      date: props.day,
      docId: docId,
    };
    Axios.post("/api/eatlog/deleteEatLog", variable).then((response) => {
      if (response.data.success) {
        console.log("deleteEatLog 성공");
        message.success("성공적으로 삭제 되었습니다.");
        props.refreshList(props.day);
      } else {
        console.log("deleteEatLog 실패");
      }
    });
  }
  const eatLogColumn = [
    {
      title: "음식명",
      dataIndex: "foodName",
      key: "foodName",
      //width: "300px",
      align: "center",
    },
    {
      title: "칼로리",
      dataIndex: "foodCal",
      key: "foodCal",
      align: "center",
    },
    {
      title: "제거",
      dataIndex: "docId",
      render: (_, record) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={(e) => deleteEatLog(e.currentTarget.value)}
        >
          <Button type="primary" shape="circle">
            -
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div>
      <br />
      <Table
        key={props.eatLogList.docId}
        columns={eatLogColumn}
        dataSource={props.eatLogList}
        height="500px"
        pagination={{ pageSize: 5 }}
      ></Table>
    </div>
  );
}

function EatLogPage() {
  const today = moment(Date.now()).format("YYYY-MM-DD"); //2017-01-25
  const [eatLogList, seteatLogList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(today);

  function setDay(value) {
    setSelectedDay(value);
  }
  function refreshList(value) {
    const variable = {
      userId: id.idInfo,
      date: value,
    };

    Axios.post("/api/eatlog/getEatLog", variable).then((response) => {
      if (response.data.success) {
        console.log("getEatLog 성공", response.data.postData);
        seteatLogList(response.data.postData);
      } else {
        console.log("getEatLog 실패");
      }
    });
  }

  useEffect(() => {
    console.log("useEffect 시작");
    Axios.post("/api/eatlog/getEatLog", {
      userId: id.idInfo,
      date: today,
    }).then((response) => {
      if (response.data.success) {
        console.log("getEatLog 성공", response.data.postData);
        seteatLogList(response.data.postData);
      } else {
        console.log("getEatLog 실패");
      }
    });
  }, []);

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>식단 기록</Title>
      <hr />
      <div className="container">
        <div className="item">
          <CCalendar
            today={today}
            setDay={setDay}
            refreshList={refreshList}
          ></CCalendar>
        </div>
        <div className="container2">
          <CEatLog day={selectedDay} refreshList={refreshList}></CEatLog>
          <CEatLogTable
            day={selectedDay}
            eatLogList={eatLogList}
            refreshList={refreshList}
          ></CEatLogTable>
        </div>
      </div>
    </div>
  );
}

export default EatLogPage;
