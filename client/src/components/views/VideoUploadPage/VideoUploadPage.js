/* eslint-disable */
import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon, Progress } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { storage, firebase } from '../../../firebase';
import 'antd/dist/antd.css';

const { TextArea } = Input;
const { Title } = Typography;


function VideoUploadPage(props) {

    const user = useSelector(state => state.user);
    console.log("data : ", user.userData);
    //크롬 redux스토어 도구를 보면 user라는 state가 있다.
    //해당 state의 모든 json 데이터 들이 user라는 변수에 담긴다.
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");

    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState("");

    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onDrop = (files) => {
        //올린 파일에 대한 정보가 files에 저장
        const file = files[0];
        const storageRef = storage.ref();
        const videofilepath = 'Videos/' + `${Date.now()}_${file.name}`;
        const fileRef = storageRef.child(videofilepath)
        var uploadTask = fileRef.put(file);
        uploadTask.then(function (snapshot) {
            setFilePath(videofilepath.toString());
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

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);

                    let variable = {
                        url: response.data.url,
                        filename: response.data.filename
                    }

                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration); // 동영상 길이
                                setThumbnailPath(response.data.url); // 썸네일 주소
                                console.log('받은 데이터 : '+ response.data.names)
                            } else {
                                alert("썸네일 생성 실패");
                            }
                        })
                } else {
                    alert('비디오 업로드 실패');
                }
            })
    }

    const onSumit = (e) => {
        e.preventDefault();

        console.log("FilePath", FilePath.toString());

        const variable = {
            id: user.userData._id,
            name: user.userData.name,
            title: VideoTitle,
            description: Description,
            url: url,
            image: user.userData.image,
            thumbnail: ThumbnailPath,
            duration: Duration,
            view : 0,
        }

        console.log("user.userData._id", user.userData._id);
        if (VideoTitle && Description) {
            Axios.post('/api/video/uploadVideo', variable)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data);
                        message.success('성공적으로 업로드를 했습니다.');

                        setTimeout(() => {
                            props.history.push('/landing');
                        }, 3000);

                    } else {
                        alert("비디오 업로드에 실패하셧습니다.");
                    }
                })
        }
        else{
            alert('모든 빈 칸을 입력해주십시오');
        }
    }

    const data = {
        //onDrop: { onDrop },
        name: 'file',
        multiple: false, //한번에 많은 양의 파일을 넣으면 true
        maxSize: 1000000000,
        accept: 'video/*'
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
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
                        <div> <img src={`http://localhost:5000/${ThumbnailPath}`} alt="haha" /> </div>
                    }
                </div>
                <div className="progress" style={{ marginTop: '15px' }}>
                    <Progress percent={Math.round(progress)} />
                </div>

                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
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

export default withRouter(VideoUploadPage)