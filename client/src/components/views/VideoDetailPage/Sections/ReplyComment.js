import React, { useEffect, useState } from 'react';
import NonSingleComment from './NonSingleComment'

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    props.commentList.forEach((comment, index) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentList]); //eslint-disable-line
  const renderReplyComment = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <NonSingleComment
              refreshFunction={props.refreshFunction}
              comment={comment}
              postId={props.postId}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };
  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{ fontSize: '14px', margin: '0', color: 'gray' }}
          onClick={onHandleChange}
        >
          {ChildCommentNumber} 개의 숨겨진 글 보기
        </p>
      )}
      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
      {/*대댓글을 달때 눌리며 나오고 아니면숨긴상태*/}
    </div>
  );
}

export default ReplyComment;