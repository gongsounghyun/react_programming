import React, { useState } from 'react';
import { Comment, Avatar} from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const user = useSelector((state) => state.user);

  const onsubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: CommentValue,
      name: user.userData.name,
      postId: props.postId,
      image : user.userData.image,
      responseTo: props.comment.docid,
    };
    Axios.post('/api/comment/saveComment', variables).then((response) => {
        if (response.data.success) {
          console.log(response.data.recoment)
          setCommentValue(''); //저장후 빈칸으로 만들기 위해
          props.refreshFunction(response.data.recoment);
          setOpenReply(false); //엔터 입력후 댓글창 자동으로 닫는기능
        } else {
          alert('커멘트를 저장하지 못했습니다.');
        }
      }); 
  };
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const actions = [
    <LikeDislikes userId = { localStorage.getItem('userId') } commentId = { props.comment._id } />
    ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.name}
        avatar={<Avatar src={props.comment.image} alt />}
        content={<p>{props.comment.content}</p>}
      />
      {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
        <form style={{ display: 'flex' }} onSubmit={onsubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <button style={{ width: '20%', height: '52px' }} onClick={onsubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;