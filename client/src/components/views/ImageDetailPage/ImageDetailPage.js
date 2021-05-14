import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, List } from 'antd';
import Axios from 'axios';
import Subscribe from '../VideoDetailPage/Sections/Subscribe';
import Comment from '../VideoDetailPage/Sections/Comment';
import LikeDislikes from '../VideoDetailPage/Sections/LikeDislikes';
import { firestore } from '../../../firebase';

function ImageDetailPage(props) {

    const videoId = props.match.params.videoId;
  console.log("videoID : ", videoId);
  //랜딩페이지에서 주소창뒤에 videoId를 보내주고있기때문에가능
  const variable = { videoId: videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);
  const [ViewCount, setViewCount] = useState(null)


  useEffect(() => {
    Axios.post('/api/image/addViewCount', variable).then((response) => {
      if (response.data.success) {
        console.log('success');
        Axios.post('/api/image/getImageDetail', variable).then((response) => {
          if (response.data.success) {
            setVideoDetail(response.data.videoDetail);
          } else {
            alert('비디오 정보를 가져오길 실패했습니다.');
          }
        });

        Axios.post('/api/comment/getComments', variable).then((response) => {
          if (response.data.success) {
            console.log("댓글 : ", response.data.comments);
            setComments(response.data.comments);
          } else {
            alert('코멘트 정보를 가져오는 것을 실패 하였습니다.');
          }
        });
      } else {
        alert('비디오 정보를 가져오길 실패했습니다.');
      }
    });  
  }, []);//eslint-disable-line

  const refreshFunction = (newComment) => {
    //부모의 Comments state값을 업데이트하기위한 함수
    setComments(Comments.concat(newComment)); //자식들한테 값을 전달받아 Comments값 업데이트
  };

  if (VideoDetail) {
    //witer를 서버에서 가져오기전에 페이지를 렌더링 할려고해서
    //VideoDetail.writer.image 부분에서 type error가 발생한다.

    console.log('VideoDetail : ', VideoDetail);
    const subscribeButton = VideoDetail.docid !== localStorage.getItem('userId') && 
    <Subscribe userTo = {VideoDetail.docid} userFrom = { localStorage.getItem('userId') } /> 

    return (
      <Row gutter={(16, 16)}>
        <Col lg={18} xs={24}>
          <div style={{ width: '100%', height: '100%', padding: '2rem 2rem' }}>
            <video
              style={{ width: '100%' }}
              src={`${VideoDetail.url}`}
              controls
            />
            <List.Item actions = { [ <LikeDislikes video userId= { localStorage.getItem('userId') } 
              videoId ={ videoId } />, subscribeButton ] }>
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.image} />}
                title={VideoDetail.title}
                description={VideoDetail.description}
              />
            </List.Item>
            조회수 : {VideoDetail.view}
          </div>
        </Col>

        <Col lg={6} xs={24}>
          <Comment postId={videoId} commentList={Comments} refreshFunction={refreshFunction} />
        </Col>
      </Row>
    );
  } else {
    return <div>...loding</div>;
  }
}

export default ImageDetailPage;