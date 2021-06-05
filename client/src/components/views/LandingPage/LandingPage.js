import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {

    const [Videos, setVideos] = useState([])

    useEffect(() => { // dom이 로드되자마자 무엇을 할껏인지
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log("request", response.data)
                    console.log("request data : ", response.data.videoData)
                    setVideos(response.data.videoData)
                } else {
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })
    }, []) // []안이 비어있으면 업데이트 될때 한번만 실행 아니면 계속 실행

    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col style = {{marginBottom : '8px'}} key = {index} lg={6} md={8} xs={24}>
            {/*lg:가장클때 6그리드를쓰겠다. md:중간크기일때 8그리드를 쓰겠다. 
            xs:가장작은 크기일때는 24그리드를 쓰겠다. 총24그리드 
            33번째 줄 비디오 디테일 클릭링크, 비디오아이디를 가져온다. >*/}
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video.docid}`}>
                <video style={{ width: '100%' , height: '200px' }} src={`${video.url}`} controls/>
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
                        <span>
                            {minutes}분 : {seconds}초
                        </span>
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

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > 비디오 </Title>
            <hr />

            <Row gutter={16} style={{marginBottom:'20px'}}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage