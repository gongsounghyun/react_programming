import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Form,
  Input,
  Progress,
  Table,
  Popconfirm,
  message,
} from "antd";
import Dropzone from "react-dropzone";
import moment from "moment";

import Axios from "axios";
import { storage, firebase } from "../../../firebase";

const { TextArea } = Input;
const { Title } = Typography;

function Mypage(props) {
  const [Data, setData] = useState();
  const [Image, setImage] = useState(); //이미지
  const [Name, setName] = useState(); //이름
  const [Email, setEmail] = useState(); //이메일
  const [Post, setPost] = useState(); //자기가 쓴 게시글 수

  const [freeBoardList, setFreeBoardList] = useState([]);
  const [freeBoardCommentList, setFreeBoardCommentList] = useState([]);
  const [deadliftValue, setDeadliftValue] = useState("");
  const [benchpressValue, setBenchpressValue] = useState("");
  const [squatValue, setSquatValue] = useState("");

  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [VideoList, setVideoList] = useState([]);
  const [ImageList, setImageList] = useState([]);
  const [userFrom, setuserFrom] = useState([]);
  const [userTo, setuserTo] = useState([]);
  const [Follownumber, setFollownumber] = useState([]);
  const [Followernumber, setFollowernumber] = useState([]);

  var id = { idinfo: localStorage.getItem("userId") };

  useEffect(() => {
    Axios.post("/api/bigthree/getmybigthrees", id).then((response) => {
      if (response.data.success) {
        if (!response.data.postData) {
          setDeadliftValue("");
          setBenchpressValue("");
          setSquatValue("");
        } else {
          setDeadliftValue(response.data.postData.deadlift);
          setBenchpressValue(response.data.postData.benchpress);
          setSquatValue(response.data.postData.squat);
        }
      }
    });

    Axios.post("/api/freeboard/getmycomments", id).then((response) => {
      if (response.data.success) {
        console.log("댓글 리스폰스데이터", response.data);
        setFreeBoardCommentList(response.data.postData);
      }
    });

    Axios.post("/api/freeboard/getmyposts", id).then((response) => {
      if (response.data.success) {
        console.log("게시글 리스폰스데이터", response.data);
        setFreeBoardList(response.data.postData);
      }
    });

    Axios.post("/api/users/getData", id).then((response) => {
      if (response.data.success) {
        setData(response.data.info);
        setImage(response.data.info.image);
        setName(response.data.info.name);
        setEmail(response.data.info.email);
      }
    });

    Axios.post("/api/video/getVideolists", id).then((response) => {
      if (response.data.success) {
        console.log("request data : ", response.data.videoData);

        setVideoList(response.data.videoData);
      }
    });

    Axios.post("/api/image/getImagelists", id).then((response) => {
      if (response.data.success) {
        console.log("request data : ", response.data.videoData);
        setImageList(response.data.image);
      }
    });

    Axios.post("/api/follow/followother", id).then((response) => {
      if (response.data.success) {
        setuserFrom(response.data.userdata);
      }
    });

    Axios.post("/api/follow/followto", id).then((response) => {
      if (response.data.success) {
        setuserTo(response.data.userdata);
      }
    });
    Axios.post("/api/follow/followcount", id).then((response) => {
      if (response.data.success) {
        setFollownumber(response.data.usercount);
      }
    });

    Axios.post("/api/follow/followercount", id).then((response) => {
      if (response.data.success) {
        setFollowernumber(response.data.usercount);
      }
    });

    //비디오, 이미지의 게시물의 카운트
    Axios.post("/api/video/count", id).then((response) => {
      if (response.data.success) {
        setPost(response.data.videocount);
      }
    });
  }, []);
  console.log(localStorage.getItem("userId"));

  const onDeadliftChange = (e) => {
    setDeadliftValue(e.currentTarget.value);
  };

  const onBenchpressChange = (e) => {
    setBenchpressValue(e.currentTarget.value);
  };

  const onSquatChange = (e) => {
    setSquatValue(e.currentTarget.value);
  };

  const onSumitBigThree = (e) => {
    e.preventDefault();
    console.log("clicked bigthree", Name);
    const variable = {
      deadlift: deadliftValue,
      benchpress: benchpressValue,
      squat: squatValue,
      id: id.idinfo,
      name: Name,
      image: Image,
      sum:
        parseInt(deadliftValue) +
        parseInt(benchpressValue) +
        parseInt(squatValue),
      time: Date.now(),
    };
    if (deadliftValue && benchpressValue && squatValue) {
      Axios.post("/api/bigthree/saveBigthree", variable).then((response) => {
        if (response.data.success) {
          console.log(response.data);
          message.success("성공적으로 업데이트 했습니다.");
          setTimeout(() => {
            props.history.push("/bigthree");
          }, 1000);
        } else {
          alert("실패하셧습니다.");
        }
      });
    }
    else{
      alert('3대 측정값의 모든 빈 칸을 입력해주십시오');
    }
  };

  const onDrop = (files) => {
    //올린 파일에 대한 정보가 files에 저장
    const file = files[0];
    const storageRef = storage.ref();
    const imagefilepath = "Profile/" + `${Date.now()}_${file.name}`;
    const fileRef = storageRef.child(imagefilepath);
    var uploadTask = fileRef.put(file);
    uploadTask.then(function (snapshot) {
      console.log("upload success");
      console.log("Uploaded a blob or file!", snapshot);
    });
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        switch (error.code) {
          case "storage/unauthorized":
            break;

          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };
  const onImage = (e) => {
    setImage(url);
    const change = {
      url: url,
      id: localStorage.getItem("userId"),
    };

    Axios.post("/api/bigthree/changeimage", change).then((response) => {
      if (response.data.success) {
        console.log("bigthree success");
      }
    });

    Axios.post("/api/image/changeurl", change).then((response) => {
      if (response.data.success) {
        console.log("image success");
      }
    });

    Axios.post("/api/videocomment/changeimage", change).then((response) => {
      if (response.data.success) {
        console.log("videocomment success");
      }
    });

    Axios.post("/api/imagecomment/changeimage", change).then((response) => {
      if (response.data.success) {
        console.log("imagecomment success");
      }
    });

    Axios.post("/api/video/changeimage", change).then((response) => {
      if (response.data.success) {
        console.log("video success");
      }
    });
  };

  const videohandleDelete = (key) => {
    console.log(key);
    var videoid = {
      id: key,
      userId: localStorage.getItem("userId"),
    };
    Axios.post("/api/video/deleteVideos", videoid).then((response) => {
      if (response.data.success) {
        setVideoList(response.data.videoData);
      }
    });
  };

  const freeboardcolumn = [
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: (text, list) => <a href={`/freeboard/${list.docid}`}>{text}</a>,
      width: "300px",
    },
    {
      title: "글쓴이",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "작성일",
      dataIndex: "time",
      render: (text, record) => (
        <span>{moment(text).format("YYYY-MM-DD")}</span>
      ),
      key: "time",
    },
    {
      title: "제거",
      dataIndex: "docid",
      render: (_, record) => (
        <Popconfirm
          title="정말 삭제하시겟습니까?"
          onConfirm={() => {
            Axios.post("/api/freeboard/delpost", { postId: record.docid }).then(
              (response) => {
                if (response.data.success) {
                  console.log("성공적으로 게시글을 삭제함");
                  message.success("성공적으로 게시글을 삭제 했습니다.");
                } else {
                  alert("커멘트를 저장하지 못했습니다.");
                }
              }
            );

            Axios.post("/api/freeboard/getmyposts", id).then((response) => {
              if (response.data.success) {
                console.log("게시글 리스폰스데이터", response.data);
                setFreeBoardList(response.data.postData);
              }
            });
          }}
        >
          <a>제거</a>
        </Popconfirm>
      ),
    },
  ];

  const freeboardCommentcolumn = [
    {
      title: "내용",
      dataIndex: "content",
      key: "content",
      render: (text, list) => <a href={`/freeboard/${list.postId}`}>{text}</a>,
      width: "300px",
    },
    {
      title: "글쓴이",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "작성일",
      dataIndex: "time",
      render: (text, record) => (
        <span>{moment(text).format("YYYY-MM-DD")}</span>
      ),
      key: "time",
    },
    {
      title: "제거",
      dataIndex: "docid",
      render: (_, record) => (
        <Popconfirm
          title="정말 삭제하시겟습니까?"
          onConfirm={() => {
            Axios.post("/api/freeboard/delcomment", {
              docId: record.docid,
            }).then((response) => {
              if (response.data.success) {
                console.log("성공적으로 댓글을 삭제함");
                message.success("성공적으로 댓글을 삭제 했습니다.");
              } else {
                console.log("댓글을 삭제 실패함");
              }
            });

            Axios.post("/api/freeboard/getmycomments", id).then((response) => {
              if (response.data.success) {
                console.log("댓글 리스폰스데이터", response.data);
                setFreeBoardCommentList(response.data.postData);
              }
            });
          }}
        >
          <a>제거</a>
        </Popconfirm>
      ),
    },
  ];

  const videocolumn = [
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: (text, list) => <a href={`/video/${list.docid}`}>{text}</a>,
      width: "300px",
    },
    {
      title: "글쓴이",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "작성일",
      dataIndex: "time",
      render: (text, record) => (
        <span>{moment(text).format("YYYY-MM-DD")}</span>
      ),
      key: "time",
    },
    {
      title: "조회수",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "제거",
      dataIndex: "docid",
      render: (_, record) =>
        VideoList.length >= 1 ? (
          <Popconfirm
            title="정말 삭제하시겟습니까?"
            onConfirm={() => videohandleDelete(record.docid)}
          >
            <a>제거</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const imagehandleDelete = (key) => {
    console.log("imagekey : ", key);
    var imageid = {
      id: key,
      userId: localStorage.getItem("userId"),
    };
    Axios.post("/api/image/deleteImages", imageid).then((response) => {
      if (response.data.success) {
        setImageList(response.data.image);
      }
    });
  };

  const imagecolumn = [
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      render: (text, list) => <a href={`/image/${list.docid}`}>{text}</a>,
      width: "300px",
    },
    {
      title: "글쓴이",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "작성일",
      dataIndex: "time",
      render: (text, record) => (
        <span>{moment(text).format("YYYY-MM-DD")}</span>
      ),
      key: "time",
    },
    {
      title: "조회수",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "제거",
      dataIndex: "docid",
      render: (_, record) =>
        ImageList.length >= 1 ? (
          <Popconfirm
            title="정말 삭제하시겟습니까?"
            onConfirm={() => imagehandleDelete(record.docid)}
          >
            <a>제거</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const userfromcolumn = [
    {
      title: "프로필",
      dataIndex: "image",
      render: (text, list) => (
        <img
          src={`${list.image}`}
          width="30px"
          height="30px"
          alt="프로필 이미지"
          title="프로필 이미지"
        />
      ), //나중에 작성자의 프로필을 보여주는 화면으로 이동할 수 있어야 한다.
      key: "image",
    },
    {
      title: "아이디",
      dataIndex: "email",
      key: "email",
      width: "200px",
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
  ];

  const usertocolumn = [
    {
      title: "프로필",
      dataIndex: "image",
      render: (text, list) => (
        <img
          src={`${list.image}`}
          width="30px"
          height="30px"
          alt="프로필 이미지"
          title="프로필 이미지"
        />
      ), //나중에 작성자의 프로필을 보여주는 화면으로 이동할 수 있어야 한다.
      key: "image",
    },
    {
      title: "아이디",
      dataIndex: "email",
      key: "email",
      width: "200px",
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
  ];

  const data = {
    name: "file",
    multiple: false,
    maxSize: 1000000000,
    accept: "image/*",
  };

  return (
    <div style={{ margin: "10px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        {" "}
        Mypage
      </Title>
      <hr></hr>
      <div
        style={{
          float: "left",
          width: "32%",
          height: "20%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2px" }}>
          <Title level={2}> 프로필 변경</Title>
        </div>
        <hr></hr>
        <Form style={{ textAlign: "center" }}>
          <Button
            disabled={progress != 100 ? true : false}
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              width: "120px",
            }}
            type="primary"
            size="large"
            onClick={onImage}
          >
            업로드
          </Button>
          <br />
          <img
            style={{
              margin: "10px",
              border: "1px solid black",
              textAlign: "center",
            }}
            width="300px"
            height="200px"
            src={Image}
          />
          <div>
            <Dropzone {...data} onDrop={onDrop} style={{ textAlign: "center" }}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "90%",
                    height: "20px",
                    border: "1px solid darkgray",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "5px",
                  }}
                  {...getRootProps()}
                >
                  {" "}
                  <input {...getInputProps()} /> 대표 이미지 변경
                </div>
              )}
            </Dropzone>
            <div
              className="progress"
              style={{ width: "90%", textAlign: "center", margin: "5px" }}
            >
              <Progress percent={Math.round(progress)} />
            </div>
          </div>
        </Form>
      </div>

      <div style={{ width: "32%", float: "left", margin: "10px" }}>
        <Title style={{ textAlign: "center" }} level={2}>
          개인정보 조회
        </Title>
        <hr />
        <table style={{ marginTop: "50px", width: "100%" }}>
          <thead style={{ border: "1px solid black" }}>
            <tr style={{ fontWeight: "900", width: "10%" }}>
              <td
                style={{
                  width: "10%",
                  textAlign: "center",
                  border: "1px solid black",
                }}
              >
                데이터
              </td>
              <td style={{ width: "10%" }}>값</td>
            </tr>
          </thead>
          <tbody style={{ border: "1px solid black" }}>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                이름
              </td>
              <td> {Name}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                이메일
              </td>
              <td>{Email}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                게시물
              </td>
              <td>{Post}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                팔로우
              </td>
              <td>{Follownumber}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr style={{ border: "1px solid black" }}>
              <td style={{ textAlign: "center", border: "1px solid black" }}>
                팔로워
              </td>
              <td>{Followernumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{
          width: "32%",
          float: "left",
          margin: "10px",
          textAlign: "center",
        }}
      >
        <Title level={2}>3대측정</Title>
        <hr />
        <Form onSubmit={onSumitBigThree}>
          <label> 데드리프트 :</label>
          <Input
            style={{ width: "15%", margin: "10px" }}
            onChange={onDeadliftChange}
            value={deadliftValue}
          />
          <br />

          <label>벤치프레스 :</label>
          <Input
            style={{ width: "15%", margin: "10px" }}
            onChange={onBenchpressChange}
            value={benchpressValue}
          />
          <br />

          <label> 스쿼트 : </label>
          <Input
            style={{ width: "15%", margin: "10px" }}
            onChange={onSquatChange}
            value={squatValue}
          />
          <br />
          <Button
            style={{ marginTop: "30px" }}
            type="primary"
            size="large"
            onClick={onSumitBigThree}
          >
            확인
          </Button>
        </Form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <div
        style={{
          float: "left",
          width: "48%",
          height: "20%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <Title level={2}>동영상</Title>
        <hr />
        <div style={{ width: "100%" }}>
          <Table
            key={VideoList.docid}
            columns={videocolumn}
            dataSource={VideoList}
            scroll={{ y: 190 }}
          ></Table>
        </div>
      </div>
      <div
        style={{
          float: "left",
          width: "48%",
          height: "20%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <Title level={2}>이미지</Title>
        <hr />
        <div style={{ width: "100%" }}>
          <Table
            key={ImageList.docid}
            columns={imagecolumn}
            dataSource={ImageList}
            scroll={{ y: 190 }}
          ></Table>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <div
        style={{
          float: "left",
          width: "48%",
          height: "20%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <Title level={2}>팔로잉</Title>
        <hr />
        <div style={{ width: "100%" }}>
          <Table
            key={userFrom.docid}
            columns={userfromcolumn}
            dataSource={userFrom}
            scroll={{ y: 190 }}
          ></Table>
        </div>
      </div>
      <div
        style={{
          float: "left",
          width: "48%",
          height: "20%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <Title level={2}>팔로워</Title>
        <hr />
        <div style={{ width: "100%" }}>
          <Table
            key={userTo.docid}
            columns={usertocolumn}
            dataSource={userTo}
            scroll={{ y: 190 }}
          ></Table>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <div
        style={{
          float: "left",
          width: "48%",
          height: "20%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <Title level={2}>게시글</Title>
        <hr />
        <Table
          key={freeBoardList.docid}
          columns={freeboardcolumn}
          dataSource={freeBoardList}
          scroll={{ y: 190 }}
        ></Table>
      </div>
      <div
        style={{
          float: "left",
          width: "48%",
          height: "20%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <Title level={2}>답글</Title>
        <hr />
        <Table
          key={freeBoardCommentList.docid}
          columns={freeboardCommentcolumn}
          dataSource={freeBoardCommentList}
          scroll={{ y: 190 }}
        ></Table>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Mypage;
