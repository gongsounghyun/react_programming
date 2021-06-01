import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Avatar, Input, Table, Button } from 'antd';
import moment from 'moment';
import Axios from 'axios';

const { Search } = Input;
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Video, setVideo] = useState([]);
  const [Image, setImage] = useState([]);
  const [User, setUser] = useState([]);

  const onSearch = value => {
    console.log(value);
    const variable = { User: value };
    Axios.post('/api/video/FollowUser', variable).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setVideo(response.data.videoData);
        } else {
          alert('구독자 비디오 가져오기를 실패했습니다.');
        }
      }
    );

    Axios.post('/api/image/FollowUser', variable).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setImage(response.data.imageData);
        } else {
          alert('구독자 비디오 가져오기를 실패했습니다.');
        }
      }
    );
  }

  const renderVideoCards = Video.map((video, index) => {

    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return <Col style={{ marginBottom: '8px' }} key={index} lg={6} xs={12}>
      <div style={{ position: 'relative' }}>
        <a href={`/video/${video.docid}`}>
          <video style={{ width: '100%', height: '200px' }} src={`${video.url}`} controls />
          <div className=" duration"
            style={{
              bottom: 0,
              right: 0,
              position: 'absolute',
              margin: '4px',
              color: '#fff',
              backgroundColor: 'rgba(17, 17, 17, 0.8)',
              opacity: 0.8,
              padding: '2px 4px',
              borderRadius: '2px',
              letterSpacing: '0.5px',
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '12px',
            }}>
            <span> {minutes}분 : {seconds}초 </span>
          </div>
        </a>
      </div><br />
      <Meta // 동그랗게 나오는 유저이미지
        avatar={
          <Avatar src={video.image} />
        }
        title={video.title}
      />
      <span>{video.name} </span><br />
      <span> {moment(video.time).format("YYYY년 MM월 DD일")} </span>
      <span> - 조회수 : {video.view}</span>
    </Col>
  })

  const renderImageCards = Image.map((image, index) => {
    return <Col style={{ marginBottom: '8px' }} key={index} lg={6} xs={12}>
      <div style={{ position: 'relative', textAlign: 'center', background: 'black' }}>
        <a href={`image/${image.docid}`} >
          <img style={{ width: 'auto', height: '180px', textAlign: 'center' }} alt="thumbnail" src={`${image.url}`} />
        </a>
      </div><br />
      <Meta // 동그랗게 나오는 유저이미지
        avatar={
          <Avatar src={image.image} />
        }
        title={image.title}
      />
      <span>{image.name} </span><br />
      <span> {moment(image.time).format("YYYY년 MM월 DD일")} </span>
      <span> - 조회수 : {image.view}</span>
    </Col>
  })
  
  const usercolumn = [
    {
        title:"프로필",
        dataIndex:"image",
        render:(text, list) => (
            <img src={`${list.image}`} width="30px" height="30px"  alt="프로필 이미지" title = "프로필 이미지"/>
        ),//나중에 작성자의 프로필을 보여주는 화면으로 이동할 수 있어야 한다.
        key:"image",
    },
    {
        title:"아이디",
        dataIndex:"email",
        key:"email",
        width:"200px",
    },
    {
        title:"이름",
        dataIndex:"name",
      key: "name",
    },
  ];

  const onSumit = (e) => {
    Axios.get('/api/users/userData')
      .then(response => {
        if (response.data.success) {
            setUser(response.data.info)
        }
      })
  }

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Button
        style={{marginTop: '10px', marginBottom: '5px', width: '120px'}}
        type="primary"
        size="large"
        onClick={onSumit}>
        전체 유저 조회
      </Button>
      <div style={{ width: '100%' }}>
        <Table key={User.docid} columns={usercolumn} dataSource={User} scroll={{ y: 300 }}></Table>
      </div>
      <Search
        style={{ width: '30%', float: 'right' }}
        placeholder="유저의 이름을 입력"
        allowClear
        enterButton="검색"
        size="large"
        onSearch={onSearch}
      />
      <Title level={2}>FollowInfo</Title>
      <hr />
      <Title level={2}>Video</Title>
      <Row gutter={16}>
        {renderVideoCards}
      </Row>
      <Title level={2}>Image</Title>
      <Row gutter={16}>
        {renderImageCards}
      </Row>
    </div>
  );
}

export default SubscriptionPage;