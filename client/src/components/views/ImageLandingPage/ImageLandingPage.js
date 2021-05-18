import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;
function ImageLandingPage() {

    const [Images, setImages] = useState([])

    useEffect(() => { // dom이 로드되자마자 무엇을 할껏인지
        axios.get('/api/image/getImages')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.image)
                    setImages(response.data.image)
                } else {
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })
    }, []) // []안이 비어있으면 업데이트 될때 한번만 실행 아니면 계속 실행

    const renderCards = Images.map((image, index) => {
        console.log("Image : ", Images)
        return <Col style = {{marginBottom : '8px'}} key = {index} lg={6} md={8} xs={24}>
            {/*lg:가장클때 6그리드를쓰겠다. md:중간크기일때 8그리드를 쓰겠다. 
            xs:가장작은 크기일때는 24그리드를 쓰겠다. 총24그리드 
            33번째 줄 비디오 디테일 클릭링크, 비디오아이디를 가져온다. */}
            <div style={{ position: 'relative', textAlign: 'center', background : 'black'}}>
                <a href={`image/${image.docid}`} > 
                <img style={{ width: 'auto', height : '180px', textAlign: 'center'}} alt="thumbnail" src={`${image.url}`} />
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

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Image Lists </Title>
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default ImageLandingPage