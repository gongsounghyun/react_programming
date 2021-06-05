import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {

    const [Videos, setVideos] = useState([])
    const [part, setPart] = useState(null)

    useEffect(() => { // dom이 로드되자마자 무엇을 할껏인지
        /*axios.get('/api/video/gethealthVideos')
            .then(response => {
                if (response.data.success) {
                    console.log("request", response.data)
                    console.log("request data : ", response.data.videoData)
                    setVideos(response.data.videoData)
                } else {
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })*/
    }, []) // []안이 비어있으면 업데이트 될때 한번만 실행 아니면 계속 실행

    const renderCards = Videos.map((video, index) => {
        return <Col style = {{marginBottom : '8px'}} key = {index} lg={12} xs={24}>
            {/*lg:가장클때 6그리드를쓰겠다. md:중간크기일때 8그리드를 쓰겠다. 
            xs:가장작은 크기일때는 24그리드를 쓰겠다. 총24그리드 
            33번째 줄 비디오 디테일 클릭링크, 비디오아이디를 가져온다. >*/}
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video.docid}`}>
                    <iframe width='700' height='400' src={`${video.url}`} title="video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </a>
            </div><br />
            <Meta // 동그랗게 나오는 유저이미지
                avatar={
                    <Avatar src={video.image} />
                }
                title={video.title}
            />
            <span>{video.name} </span><br />
        </Col>
    })

    const onbody = (e) => {
        console.log(e)
        const data = {
            bodypart : e
        }
        axios.post('/api/video/gethealthVideos',data)
            .then(response => {
                if (response.data.success) {
                    console.log("request", response.data)
                    console.log("request data : ", response.data.videoData)
                    setVideos(response.data.videoData)
                } else {
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > 운동 영상 </Title>
            <Button 
                style={{ marginLeft: '10px', marginTop: '10px', width: '120px'}}
                type="primary" size="large"
                onClick={() => onbody("chest")}
                > 가슴 운동
            </Button>
            <Button 
                style={{ marginLeft: '10px', marginTop: '10px', width: '120px'}}
                type="primary" size="large"
                onClick={() => onbody("back")}
                > 등 운동
            </Button>
            <Button 
                style={{ marginLeft: '10px', marginTop: '10px', width: '120px'}}
                type="primary" size="large"
                onClick={() => onbody("soulder")}
                > 어깨 운동
            </Button>
            <Button 
                style={{ marginLeft: '10px', marginTop: '10px', width: '120px'}}
                type="primary" size="large"
                onClick={() => onbody("leg")}
                > 하체 운동
            </Button>
            <Button 
                style={{ marginLeft: '10px', marginTop: '10px', width: '120px'}}
                type="primary" size="large"
                onClick={() => onbody("arm")}
                > 팔 운동
            </Button><Button 
                style={{ marginLeft: '10px', marginTop: '10px', width: '120px'}}
                type="primary" size="large"
                onClick={() => onbody("cardio")}
                > 유산소 운동
            </Button>
            <hr />

            <Row gutter={16} style={{marginBottom:'20px'}}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage