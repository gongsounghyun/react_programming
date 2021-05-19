import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, message, Input, Icon, Progress, Avatar } from 'antd';
import Dropzone from 'react-dropzone';

import Axios from 'axios';
import {storage, firebase} from '../../../firebase'

const { TextArea } = Input;
const { Title } = Typography;

function Mypage() {
    const [Data, setData] = useState()
    const [Image, setImage] = useState()

    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");

    useEffect(() => {
    var id = { idinfo: localStorage.getItem("userId") }
    Axios.post('/api/users/getData', id)
            .then(response => {
                if (response.data.success) {
                    setData(response.data.info)
                }
            })
    }, [])

    const onSumit =(e)=>{
        e.preventDefault();
        setImage(Data.image);
    }

    const onDrop = (files) => {
        //올린 파일에 대한 정보가 files에 저장
        const file = files[0];
        const storageRef = storage.ref();
        const imagefilepath = 'Profile/' + `${Date.now()}_${file.name}`;
        const fileRef = storageRef.child(imagefilepath)
        var uploadTask = fileRef.put(file);
        uploadTask.then(function (snapshot) {
            console.log("upload success");
            console.log('Uploaded a blob or file!', snapshot);
        })
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function (error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;

                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                    }
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
                setUrl(downloadURL.toString())
            });
        });

        const change={
            url:url,
            id:localStorage.getItem('userId')
        }

        Axios.post('/api/image/changeurl',change)
        .then(response => {
            if (response.data.success) {
                console.log(response.data);

            }
        })
    }

    const data = {
        //onDrop: { onDrop },
        name: 'file',
        multiple: false,
        maxSize: 1000000000,
        accept: 'image/*'
    }

    return (
        <div style={{ width:'100%', margin: '10px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Mypage</Title>
            </div>
            <div style={{ border: '1px solid black', height:'20%'}}>
                <Form onSubmit={onSumit}>
                    <Button style = {{marginLeft:'100px', marginTop:'5px'}} type = "primary" size = "large" onClick = {onSumit}> 개인정보 조회 </Button><br/>
                    <img style={{ margin: '10px', border:'1px solid black'}} width='300px' height="200px" src={Image} />
                    <div style={{ display: 'flex' }}>
                        <Dropzone {...data} onDrop={onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{
                                    width: '300px', height: '20px', border: '1px solid lightgray',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5px'
                                }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    대표 이미지 변경
                                </div>
                            )}
                        </Dropzone>
                    </div>

                    <div className="progress" style={{ width: '300px', marginTop: '15px' }}>
                        <Progress percent={Math.round(progress)} />
                    </div>
                    
                    <br />
                </Form>
            </div>
        </div>

    )
}

export default Mypage
