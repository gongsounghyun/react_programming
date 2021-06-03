import React, { useEffect, useState } from 'react'
import { Calendar, Badge, Typography, Button } from 'antd';
import data from './Tournamentdata'
import Axios from 'axios';

const { Title } = Typography;

function Tournament() {
    const [Touranmentdata, SetTournamentdata] = useState([]);

    useEffect(() => {
        Axios.post('/api/tournament/getdata')
        .then(response => {
            if(response.data.success){
                SetTournamentdata(response.data.touranmentdata)
            }
        })
    }, [])

    function getListData(value) {
        let listData = [];
        Touranmentdata.forEach(data => {
            if (value.month() === parseInt(data.month)-1) {
                switch (value.date()) {
                    case parseInt(data.day):
                        listData.push({ type: "success", content: data.name })
                        break;
                    default:
                }
            }
        })
        return listData || [];
    }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
            <ul className="events" style={{listStyle:'none'}}>
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div style={{ width: '90%', margin: '2rem auto' }}>
            <Title style={{ textAlign: 'center', marginBottom: '10px' }} level={2} > 대회 정보 </Title>
            <hr />
            <Calendar dateCellRender={dateCellRender} />,
            <hr />
            <br/><br/>
        </div>
    )
}

export default Tournament
