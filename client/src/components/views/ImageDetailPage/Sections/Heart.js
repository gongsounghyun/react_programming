import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function Heart(props) {

    const [Hearts, setHearts] = useState(0)
    const [HeartAction, setHeartAction] = useState(null)
    let variable = {};

    if (props.image) {
        variable = { imageId: props.imageId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {
        Axios.post('/api/heart/imggetHearts', variable)
            .then(response => {
                if (response.data.success) { 
                    setHearts(response.data.heart.length) 
                    response.data.heart.forEach(heart => {
                        if (heart.userId === props.userId) {
                            setHeartAction('Heartd')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })
    }, [])//eslint-disable-line
    const onHeart = () => {
        if (HeartAction === null) {
            Axios.post('/api/heart/imgupHeart', variable)
                .then(response => {
                    if (response.data.success) {
                        setHearts(Hearts + 1)
                        setHeartAction('Heartd')
                    } else {
                        alert('Failed to increase the like')
                    }
                })
        } else {
            Axios.post('/api/heart/imgunHeart', variable)
                .then(response => {
                    if (response.data.success) {
                        setHearts(Hearts - 1)
                        setHeartAction(null)
                    } else {
                        alert('Failed to decrease the like')
                    }
                })
        }
    }
    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="heart">
                    <Icon type="heart"
                        theme={HeartAction === 'Heartd' ? 'filled' : 'outlined'}
                        onClick={onHeart} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Hearts}</span>
            </span>&nbsp;&nbsp;
        </React.Fragment>
    )
}

export default Heart