import React, { useEffect, useState } from 'react';
import { Avatar, Col, Typography, Row, Button, Form, message, Input, Card} from 'antd';
import moment from 'moment';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";


const { Title } = Typography;
const { Meta } = Card;

function BigthreePage(props) {

  const [Bigthrees, setBigthrees] = useState([])

  useEffect(() => { // dom이 로드되자마자 무엇을 할껏인지
      Axios.get('/api/bigthree/getBigthrees')
          .then(response => {
              if (response.data.success) {
                  console.log(response.data.bigthrees)
                  setBigthrees(response.data.bigthrees)
              } else {
                  alert('3대 측정 가져오기를 실패했습니다.')
              }
          })
  }, []) // []안이 비어있으면 업데이트 될때 한번만 실행 아니면 계속 실행


  const renderCards = Bigthrees.map((bigthree, index) => {
    return <Col lg={6} md={8} xs={24}>
        <Meta // 동그랗게 나오는 유저이미지
            avatar={
                <Avatar src={bigthree.writer.image} />
            }
        />
        <span>{bigthree.writer.name} </span>
        <br />
        <span style={{ marginLeft: '3rem' }}> 데드리프트: {bigthree.deadlift}</span>
        <br />
        <span style={{ marginLeft: '3rem' }}> 벤치프레스: {bigthree.benchpress} </span>
        <br />
        <span style={{ marginLeft: '3rem' }}> 스쿼트 : {bigthree.squat}</span>
        <br />
        <span style={{ marginLeft: '3rem' }}> {moment(bigthree.createdAt).format("MMM Do YY")} </span>
    </Col>

  })

  const [Deadlift, setDeadlift] = useState("");
  const [Benchpress, setBenchpress] = useState("");
  const [Squat, setSquat] = useState("");
  const user = useSelector(state => state.user);

  const onDeadliftChange = (e) => {
    setDeadlift(e.currentTarget.value);
  }

  const onBenchpressChange = (e) => {
    setBenchpress(e.currentTarget.value);
  }

  const onSquatChange = (e) => {
    setSquat(e.currentTarget.value);
  }

  const onSumit = (e) => {
    e.preventDefault();

    const variable = {
      writer: user.userData._id,
      deadlift: Deadlift,
      benchpress: Benchpress,
      squat: Squat,
    }

    Axios.post('/api/bigthree/saveBigthree', variable)
    .then(response => {
        if(response.data.success){
            console.log(response.data);
            message.success('성공적으로 업로드를 했습니다.');
            setTimeout(() => console.log("after"), 3000);
            window.location.reload(true);



            
        }else{
            alert("실패하셧습니다.");
        }
    })
}


  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}>3대측정</Title>
      <hr />
      
      <Form onSubmit = {onSumit}>
      <label>  데드리프트 </label>
      <Input style={{ width: '20%', margin: '3rem auto' }}
        onChange = { onDeadliftChange }
        value = { Deadlift }
      />

      <label>벤치프레스 </label>
      <Input style={{ width: '20%', margin: '3rem auto' }}
        onChange = { onBenchpressChange }
        value = { Benchpress }
      />

      <label>스쿼트 </label>
      <Input style={{ width: '20%', margin: '3rem auto' }}
        onChange = { onSquatChange }
        value = { Squat }
      />
      <br />
      <Button type = "primary" size = "large" onClick = {onSumit}>
        확인
      </Button>
      </Form>
      <br />
      <hr />
      <br />
      

      <Row gutter={16}>
        {renderCards}
      </Row>

    </div>


	);
}
export default withRouter(BigthreePage)