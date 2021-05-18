import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, List } from 'antd';
import Axios from 'axios';
import Follow from '../ImageDetailPage/Sections/Follow';
import Comment from '../ImageDetailPage/Sections/Comment';
import Heart from '../ImageDetailPage/Sections/Heart';

function ImageDetailPage(props) {
  const imageId = props.match.params.imageId;
  console.log("imageID : ", imageId);
  //랜딩페이지에서 주소창뒤에 videoId를 보내주고있기때문에가능
  const variable = { imageId: imageId };
  const [ImageDetail, setImageDetail] = useState([]);
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    Axios.post('/api/image/addViewCount', variable).then((response) => {
      if (response.data.success) {
        console.log('success');
        Axios.post('/api/image/getImageDetail', variable).then((response) => {
          if (response.data.success) {
            setImageDetail(response.data.imageDetail);
          } else {
            alert('비디오 정보를 가져오길 실패했습니다.');
          }
        });

        Axios.post('/api/imagecomment/getComments', variable).then((response) => {
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

  if (ImageDetail) {
    //witer를 서버에서 가져오기전에 페이지를 렌더링 할려고해서
    //VideoDetail.writer.image 부분에서 type error가 발생한다.
    var followdata = {
      userTo: ImageDetail.id,
      userFrom:localStorage.getItem('userId')
    };

    console.log('ImageDetail : ', ImageDetail);
    const subscribeButton = ImageDetail.id !== localStorage.getItem('userId') && 
    <Follow followdata={followdata} /> 

    return (
      <Row gutter={(16, 16)}>
        <Col lg={18} xs={24}>
          <div style={{ width: '100%', height: '100%', padding: '2rem 2rem' }}>
            <img
              style={{ width: '100%' }}
              src={`${ImageDetail.url}`}
              alt ="이미지"
              controls
            />
            <List.Item actions = { [ <Heart image userId= { localStorage.getItem('userId') } 
              imageId ={ imageId } />, subscribeButton ] }>
              <List.Item.Meta
                avatar={<Avatar src={ImageDetail.image} />}
                title={ImageDetail.title}
                description={ImageDetail.description}
              />
            </List.Item>
            조회수 : {ImageDetail.view}
          </div>
        </Col>

        <Col lg={6} xs={24}>
          <Comment postId={imageId} commentList={Comments} refreshFunction={refreshFunction} />
        </Col>
      </Row>
    );
  } else {
    return <div>...loding</div>;
  }
}

export default ImageDetailPage;