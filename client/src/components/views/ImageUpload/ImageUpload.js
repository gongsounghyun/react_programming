/* eslint-disable */
import React, { useState } from 'react';
import {Typography, Button, Form, message, Input, Icon, Progress} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { storage, firebase } from '../../../firebase';
import 'antd/dist/antd.css';

const { TextArea} = Input;
const { Title } = Typography;

function ImageUploadPage(props){
    
    const user = useSelector(state => state.user);
    //크롬 redux스토어 도구를 보면 user라는 state가 있다.
    //해당 state의 모든 json 데이터 들이 user라는 변수에 담긴다.
    const [ImageTitle, setImageTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    const [ThumbnailPath, setThumbnailPath] = useState("")
    const [progress, setProgress] = useState(0);

    const onTitleChange = (e) => {
        setImageTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onDrop = (files) => {
        //올린 파일에 대한 정보가 files에 저장
        const file = files[0];
        const storageRef = storage.ref();
        const imagefilepath = 'Image/' + `${Date.now()}_${file.name}`;
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
                    console.log("URL : ", url);
                });
            });
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        Axios.post('/api/image/uploadImagefiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setThumbnailPath(response.data.url);
                } else {
                    alert('비디오 업로드 실패');
                }
            })
    }

    const onSumit = (e) => {
        e.preventDefault();

        const variable = {
            id: user.userData._id,
            name: user.userData.name,
            url: url,
            title: ImageTitle,
            description: Description,
            image: user.userData.image,
            view : 0,
        }

        Axios.post('/api/image/uploadImage', variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                message.success('성공적으로 업로드를 했습니다.');

                setTimeout(() => {
                    props.history.push('/');
                }, 3000);
                
            }else{
                alert("비디오 업로드에 실패하셧습니다.");
            }
        })
    }

    const data = {
        //onDrop: { onDrop },
        name: 'file',
        multiple: false, //한번에 많은 양의 파일을 넣으면 true
        maxSize: 1000000000,
        accept: 'image/*'
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Image</Title>
            </div>
            <Form onSubmit={onSumit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone {...data} onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rm' }} />
                            </div>
                        )}
                    </Dropzone>
                    { /* 썸네일 */}
                    {ThumbnailPath !== '' &&
                        <div> <img src={`http://localhost:5000/${ThumbnailPath}`} alt="haha" width="320px" height="240px"/> </div>
                    }
                </div>
                <div className="progress" style={{ marginTop: '15px' }}>
                    <Progress percent={Math.round(progress)} />
                </div>

                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={ImageTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <br />
                <br />

                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <Button disabled={progress != 100 ? true : false} type="primary" size="large" onClick={onSumit}>
                    등록
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(ImageUploadPage)