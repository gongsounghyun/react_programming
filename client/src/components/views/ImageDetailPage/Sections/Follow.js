import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Subscribe(props) {

    const [FollowNumber, setFollowNumber] = useState(0)
    const [Followed, setFollowed] = useState(false) // 거짓은 구독 x 참은 구독

    useEffect(() => {

        let variable = { userTo : props.userTo }
        
        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(response => {
            if(response.data.success){
                setFollowNumber(response.data.subscribeNumber);
            }else{
                alert('구독자 수 정보를 받아오지 못했습니다.')
            }
        })
        let subscribedvariable = { 
            userTo : props.userTo, 
            userFrom : props.userFrom
        }

        Axios.post('/api/subscribe/subscribed', subscribedvariable)
        .then(response => {
            if(response.data.success){
                setFollowed(response.data.subscribed)
            }else{
                alert('정보를 받아오지 못했습니다.');
            }
        })

    }, [])//eslint-disable-line


    const onFollow = () => {
        let subscribedVariable = {
        userTo: props.userTo,
        userFrom: props.userFrom,
        };
        if (Followed) {
        //이미구독중이라면
        Axios.post('/api/subscribe/unSubscribe', subscribedVariable).then(
            (response) => {
            if (response.data.success) {
                setFollowNumber(FollowNumber - 1);
                setFollowed(!Followed);
            } else {
                alert('구독 취소 하는데 실패 했습니다.');
            }
         }
        );
        } else {
        //구독중이 아니라면
            Axios.post('/api/subscribe/Subscribe', subscribedVariable).then(
                (response) => {
                    if (response.data.success) {
                        setFollowNumber(FollowNumber + 1);
                        setFollowed(!Followed);
                    } else {
                    alert('구독 하는데 실패 했습니다.');
                    }
                }
            );
        }
    };

    return (
        <div>
            <button 
            style = {{
                backgroundColor: `${Followed ? '#AAAAAA' : '#CC0000'}`, 
                borderRadius : '4px',
                color : 'white', 
                padding : '10px 16px', 
                fontWeight : '500', 
                fontSize : '1rm', }}
            onClick = { onFollow }
            >
            {FollowNumber} {Followed ? 'Followed' : 'Follow'}
            </button>
        </div>
    )
}

export default Subscribe
