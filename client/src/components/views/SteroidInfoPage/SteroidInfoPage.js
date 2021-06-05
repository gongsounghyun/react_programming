import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Typography, Table, Input, Card } from "antd";
import { withRouter } from "react-router-dom";
import moment from "moment";
import "./SteroidInfoPage.css";

const { Title } = Typography;
const { Column, ColumnGroup } = Table;
const { Search } = Input;

const CSteroidListTable = (props) => {
  function handleClick(docId, e) {
    //하이퍼링크 이벤트 지정
    e.preventDefault();
    console.log("The link was clicked.", docId);

    Axios.post("/api/steroidinfo/getSteroidDetail", { steriodId: docId }).then(
      (response) => {
        if (response.data.success) {
          console.log("getSteroidDetail 로드성공 데이터:", response.data);
          props.onChange(response.data.postData);
        } else {
          alert("getSteroidDetail 로드 실패");
        }
      }
    );
  }

  return (
    <div>
      <Table dataSource={props.data}>
        <Column
          title="이름"
          dataIndex="name"
          key="docId"
          render={(text, record) => (
            //<a href="#" id="" onClick={handleClick.bind(text)}>
            <a href="#" id="" onClick={(e) => handleClick(record.docId, e)}>
              {text}
            </a>
          )}
        />
      </Table>
    </div>
  );
};

const CSteroidDetail = (props) => {
  return (
    <div className="info">
      <Title level={3}>{props.data.name}</Title>

      <Title level={4}>부작용</Title>
      <p>{props.data.effect}</p>

      <Title level={4}>history</Title>
      <p>{props.data.history} </p>

      <Title level={4}>info</Title>
      <p>{props.data.info} </p>

      <Title level={4}>scientifcname</Title>
      <p>{props.data.scientifcname} </p>

      <Title level={4}>사용법</Title>
      <p>{props.data.use} </p>
    </div>
  );
};

const SteroidinfoPage = () => {
  const [steroidLlist, setSteroidList] = useState([]);
  const [steroidDetail, setSteroidDetail] = useState({
    effect: "-",
    history: "-",
    info: "-",
    name: "-",
    scientifcname: "-",
    use: "-",
  });

  function handleChange(newValue) {
    setSteroidDetail(newValue);
  }

  function onSearch(value) {
    console.log(value);
    Axios.post("/api/steroidinfo/searchSteroid", { steroidName: value }).then(
      (response) => {
        if (response.data.success) {
          console.log("getSteroidList 로드성공 데이터:", response.data);
          setSteroidList(response.data.postData);
        } else {
          alert("getSteroidList 로드 실패");
        }
      }
    );
  }
  useEffect(() => {
    Axios.get("/api/steroidinfo/getSteroidList").then((response) => {
      if (response.data.success) {
        console.log("getSteroidList 로드성공 데이터:", response.data);
        setSteroidList(response.data.postData);
      } else {
        alert("getSteroidList 로드 실패");
      }
    });
  }, []);

  return (
    <div style={{ width: "85%", margin: "3rem auto"}}>
      <Title level={2}>스테로이드 정보</Title>
      <hr />
      <div className="box0">
        <div className="box1">
          <Search
            style={{ marginBottom: "10px" }}
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />

          <CSteroidListTable
            data={steroidLlist}
            onChange={handleChange}
          ></CSteroidListTable>
        </div>
        <div className="box2">
          <CSteroidDetail data={steroidDetail}></CSteroidDetail>
        </div>
      </div>
    </div>
  );
};

export default SteroidinfoPage;
