import React, { useEffect, useState } from 'react'
import Map from "./KakaomapContainer";

function Kakaomap() {
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')

    const onChange = (e) => {
        setInputText(e.target.value)
    }

    const BusanseahandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 서구 헬스장")
    }

    const BusanjunghandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 중구 헬스장")
    }

    const BusangangseahandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 강서구 헬스장")
    }

    const BusangeumjeonghandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 금정구 헬스장")
    }

    const BusangijanghandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 기장군 헬스장")
    }

    const BusannamguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 남구 헬스장")
    }

    const BusandongguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 동구 헬스장")
    }

    const BusandongnaehandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 동래구 헬스장")
    }

    const BusanjinguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 진구 헬스장")
    }

    const BusanbukguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 북구 헬스장")
    }

    const BusansasangguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 사상구 헬스장")
    }

    const BusansahaguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 사하구 헬스장")
    }

    const BusansuyeongguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 수영구 헬스장")
    }

    const BusanyeonjeguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 연제구 헬스장")
    }

    const BusanyeongdoguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 영도구 헬스장")
    }

    const BusanhaeundaeguhandleSubmit = (e) => {
        e.preventDefault()
        setPlace("부산 해운대구 헬스장")
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        if(InputText){
            setPlace(InputText + "헬스장")
            setInputText("");
        }
        else{
            alert("검색어를 입력해주십시오.");
        }
    }

    return (
        <>
            <div id="busan">
            <h1 style={{textAlign:'center'}}>Busan</h1>
                <form className="inputForm" onSubmit={BusanseahandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', marginLeft:'70px', width:"80px"}} type="submit">서구</button>
                </form>
                <form className="inputForm" onSubmit={BusanjunghandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">중구</button>
                </form>
                <form className="inputForm" onSubmit={BusangangseahandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">강서구</button>
                </form>
                <form className="inputForm" onSubmit={BusangeumjeonghandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">금정구</button>
                </form>
                <form className="inputForm" onSubmit={BusangijanghandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">기장군</button>
                </form>
                <form className="inputForm" onSubmit={BusannamguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">남구</button>
                </form>
                <form className="inputForm" onSubmit={BusandongguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">동구</button>
                </form>
                <form className="inputForm" onSubmit={BusandongnaehandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">동래구</button>
                </form>
                <form className="inputForm" onSubmit={BusanjinguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">진구</button>
                </form>
                <form className="inputForm" onSubmit={BusanbukguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">북구</button>
                </form>
                <form className="inputForm" onSubmit={BusansasangguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">사상구</button>
                </form>
                <form className="inputForm" onSubmit={BusansahaguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">사하구</button>
                </form>
                <form className="inputForm" onSubmit={BusansuyeongguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">수영구</button>
                </form>
                <form className="inputForm" onSubmit={BusanyeonjeguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">연제구</button>
                </form>
                <form className="inputForm" onSubmit={BusanyeongdoguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">영도구</button>
                </form>
                <form className="inputForm" onSubmit={BusanhaeundaeguhandleSubmit} style={{ float: 'left' }}>
                    <button style={{ margin: '10px', width:"80px"}} type="submit">해운대구</button>
                </form>
            </div>
            <form className="inputForm" onSubmit={handleSubmit} style={{ float: 'right' }}>
                <input style={{ marginLeft: '1450px' }} placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
                <button style={{ margin: '10px' }} type="submit">검색</button>
            </form>
            <Map searchPlace={Place} />
        </>
    )
}

export default Kakaomap
