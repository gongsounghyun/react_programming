import React, { useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
  const videoId = props.postId;
  const [commentValue, setcommentValue] = useState('');
  const user = useSelector((state) => state.user);

  const handleChange = (event) => {
    setcommentValue(event.currentTarget.value);
  };

  const onsubmit = (event) => {
    event.preventDefault();
    const variables = {
      id : user.userData._id,
      content: commentValue,
      name: user.userData.name,
      postId: videoId,
      image : user.userData.image,
      responseTo: null,
    };
    if(commentValue){
    Axios.post('/api/videocomment/saveComment', variables).then((response) => {
      if (response.data.success) {
        console.log("comment : ", response.data.recoment);
        setcommentValue("");
        props.refreshFunction(response.data.recoment);
      } else {
        alert('커멘트를 저장하지 못했습니다.');
      }
    });
    }
    else{
      alert('빈 커맨트는 저장할 수 없습니다.');
    }
  };
  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}
      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && ( //대댓글은 우선 숨기겠다는 의미
              <React.Fragment>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={props.postId}
                  key={index}
                />
                
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  commentList={props.commentList}
                  parentCommentId={comment.docid}
                  postId={props.postId}
                  key={index}
                />

              </React.Fragment>
            )
        )}
      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onsubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onsubmit}> 등록 </button>
      </form>
    </div>
  );
}

export default Comment;