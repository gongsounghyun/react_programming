import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Checkbox,
} from "antd";
import moment from "moment";
import Axios from "axios";
import { resolve } from "path";

const { Title } = Typography;
const { Column, ColumnGroup } = Table;
const { TextArea } = Input;
const { Search } = Input;

const id = localStorage.getItem("userId");
const today = moment(Date.now()).format("YYYY-MM-DD"); //2017-01-25

function FoodInfoPage() {
  const [foodData, setfoodData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [saveValues, setSaveValues] = useState([]);
  const [userName, setUserName] = useState({});
  const [testName, testSetName] = useState("");
  const user = useSelector((state) => state.user.userData);

  const onserachValueChange = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  function test() {
    let sum = 0;
    let a = saveValues.forEach((ob) => {
      sum = sum + parseInt(ob.cal);
      console.log(sum);
    });
    return sum;
  }

  const onSumit = (value) => {
    console.log("clicked");
    const variable = { search: value };
    if (value) {
      Axios.post("/api/foodapi/getfoods", variable).then((response) => {
        if (response.data.success) {
          console.log("음식정보", response.data.data);
          setfoodData(response.data.data);
        } else {
          alert("실패했습니다.");
        }
      });
    }
    else{
      alert('검색하려는 음식을 입력해주십시오');
    }
  };
  useEffect(() => {
    if (user) {
      console.log(user.name);
      testSetName(user.name);
    }
  }, [user]); //
  const addedFoods = [
    {
      title: "음식 이름",
      dataIndex: "name",
      key: "",
      width: "50%",
      align: "center",
    },

    {
      title: "칼로리",
      dataIndex: "cal",
      key: "",
      width: "25%",
      align: "center",
    },

    {
      title: "선택",
      dataIndex: "length",
      key: "",
      width: "20%",
      align: "center",
      render: (text, record) => (
        <Button
          type="primary"
          shape="circle"
          onClick={(e) => {
            let newArray = saveValues.filter(function (v, i) {
              if (v.name == record.name && v.cal == record.cal) {
                return false;
              } else return true; //&& v.name !== record.name;
            });
            console.log("newarrpy", newArray);
            setSaveValues(newArray);
          }}
        >
          -
        </Button>
      ),
    },
  ];

  const foodMecro = [
    {
      title: "이름",
      dataIndex: "DESC_KOR",
      key: "DESC_KOR",
      width: "30px",
    },
    {
      title: "회사",
      dataIndex: "ANIMAL_PLANT",
      key: "ANIMAL_PLANT",
      width: "30px",
      render: (text, record) => (
        <span>
          {text} {record.BGN_YEAR}
        </span>
      ),
    },
    {
      title: "1회 제공량",
      dataIndex: "SERVING_WT",
      key: "SERVING_WT",
      width: "30px",
    },
    {
      title: "열량",
      dataIndex: "NUTR_CONT1",
      key: "NUTR_CONT1",
      width: "30px",
    },
    {
      title: "탄수화물",
      dataIndex: "NUTR_CONT2",
      key: "NUTR_CONT2",
      width: "30px",
    },
    {
      title: "단백질",
      dataIndex: "NUTR_CONT3",
      key: "NUTR_CONT3",
      width: "30px",
    },
    {
      title: "지방",
      dataIndex: "NUTR_CONT4",
      key: "NUTR_CONT4",
      width: "30px",
    },
    {
      title: "당류",
      dataIndex: "NUTR_CONT5",
      key: "NUTR_CONT5",
      width: "30px",
    },
    {
      title: "나트륨",
      dataIndex: "NUTR_CONT6",
      key: "NUTR_CONT6",
      width: "30px",
    },
    {
      title: "콜레스테롤",
      dataIndex: "NUTR_CONT7",
      key: "NUTR_CONT7",
      width: "30px",
    },
    {
      title: "포화지방산",
      dataIndex: "NUTR_CONT8",
      key: "NUTR_CONT8",
      width: "30px",
    },
    {
      title: "선택",
      dataIndex: "NUTR_CONT9",
      key: "NUTR_CONT9",
      width: "30px",
      render: (text, record) => (
        <Button
          type="primary"
          shape="circle"
          onClick={() => {
            setSaveValues((oldArray) => [
              ...oldArray,
              { name: record.DESC_KOR, cal: record.NUTR_CONT1 },
            ]);
            console.log(record);
          }}
        >
          +
        </Button>
      ),
    },
  ];

  const saveEatLog = () => {
    console.log(saveValues, today, id);

    const variable = {
      date: today,
      userId: id,
      savedFoods: saveValues,
    };

    Axios.post("/api/eatlog/saveFoods", variable).then((response) => {
      if (response.data.success) {
        console.log("saveFoods 성공");
        message.success("식단 기록에 추가되었습니다.");
      } else {
        console.log("saveFoods 실패");
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>음식정보 게시판</Title>
      <hr />

      <Search
        style={{ marginBottom: "10px" }}
        placeholder="검색할 음식 이름을 넣으세요"
        onSearch={onSumit}
        enterButton
      />

      <div style={{ width: "100%" }}>
        <Table
          pagination={{ pageSize: 5 }}
          columns={foodMecro}
          dataSource={foodData}
        ></Table>
      </div>
      <br />
      <Table
        pagination={{ pageSize: 5 }}
        columns={addedFoods}
        dataSource={saveValues}
      ></Table>

      <p align="center" style={{ marginTop: "30px", fontSize: "large" }}>
        <b>총 칼로리: {test()}</b> <br /> <br />
        <Button style={{}} type="primary" onClick={saveEatLog}>
          오늘({today}) 식단에 추가하기
        </Button>
        <br /> <br />
        <Button
          onClick={() => {
            setSaveValues([]);
            message.success("초기화되었습니다.");
          }}
        >
          저장 초기화
        </Button>
      </p>
    </div>
  );
}

export default FoodInfoPage;
