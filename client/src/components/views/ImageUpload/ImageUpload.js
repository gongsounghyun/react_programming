import React, { useState } from 'react';
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";

const { TextArea} = Input;
const { Title } = Typography;

function ImageUploadPage(props){
    
    const user = useSelector(state => state.user);
    //크롬 redux스토어 도구를 보면 user라는 state가 있다.
    //해당 state의 모든 json 데이터 들이 user라는 변수에 담긴다.
    const [ImageTitle, setImageTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [LocalFilePath, setLocalFilePath] = useState("");
    const [ImageName, setImageName] = useState("");
    const [FilePath, setFilePath] = useState("");

    const onTitleChange = (e) => {
        setImageTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onDrop = (files) => {
        //올린 파일에 대한 정보가 files에 저장
        let formData = new FormData;
        const config = {
            header : {'content-type' : 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/image/uploadImagefiles', formData, config)
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                let variable = {
                    url : response.data.url,
                    filename : response.data.filename,
                }

                let filename1 = "http://localhost:5000/uploads/image/"+response.data.filename;

                setFilePath(filename1);
                setImageName(response.data.filename);
                //setLocalFilePath(localpath);
            }else{
                alert('비디오 업로드 실패');
            }
        })
    }

    const onSumit = (e) => {
        e.preventDefault();

        const variable = {
            writer: user.userData._id,
            title: ImageTitle,
            filename : ImageName,
            description: Description,
            filePath: FilePath,
            localfilepath : LocalFilePath,
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

    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload image</Title>
            </div>

            <Form onSubmit = {onSumit}>
                <div style = {{display : 'flex', justifyContent : 'space-between'}}>
                    { /* 드랍존 */ }

                    <Dropzone 
                        onDrop = { onDrop }
                        multiple = { false } //한번에 많은 양의 파일을 넣으면 true
                        maxSize = { 1000000000 }
                    >
                        {({getRootProps, getInputProps})=> (
                            <div style = {{ width : '300px', height : '240px', border : '1px solid lightgray',
                             display : 'flex', alignItems:'center', justifyContent : 'center'}} {...getRootProps()}>
                                 <input {...getInputProps() } />
                                 <Icon type = "plus" style = {{fontSize : '3rm'}} />
                            </div>
                        )}
                    </Dropzone>
                    { /* 썸네일 */ }
                    {FilePath !== '' && 
                        <div>
                            <img src={"http://localhost:5000/uploads/image/"+ ImageName} alt="haha" />
                        </div>
                    }
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange = { onTitleChange }
                    value = { ImageTitle }
                />
                <br />
                <br />
                <label>Description</label>
                <br />
                <br />

                <TextArea
                    onChange = { onDescriptionChange }
                    value = { Description }
                    />
                <br />
                <br />

                <Button type = "primary" size = "large" onClick = {onSumit}>
                    submit
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(ImageUploadPage)