import { Table } from 'antd';
import React, { useEffect, useState } from 'react'

const { kakao } = window

const KakaomapContainer = ({ searchPlace }) => {
    // 검색결과 배열에 담아줌
    const [Places, setPlaces] = useState([])

    useEffect(() => {
        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
        var markers = []
        const container = document.getElementById('myMap')
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        }
        const map = new kakao.maps.Map(container, options)

        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(searchPlace, placesSearchCB)

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                let bounds = new kakao.maps.LatLngBounds()

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i])
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
                }

                map.setBounds(bounds)
                // 페이지 목록 보여주는 displayPagination() 추가
                displayPagination(pagination)
                setPlaces(data)
            }
        }

        function displayPagination(pagination) {
            var paginationEl = document.getElementById('pagination'),
                fragment = document.createDocumentFragment(),
                i

            // 기존에 추가된 페이지 번호 삭제
            while (paginationEl.hasChildNodes()) {
                paginationEl.removeChild(paginationEl.lastChild)
            }

            for (i = 1; i <= pagination.last; i++) {
                var el = document.createElement('a')
                el.href = '#'
                el.innerHTML = i

                if (i === pagination.current) {
                    el.className = 'on'
                } else {
                    el.onclick = (function (i) {
                        return function () {
                            pagination.gotoPage(i)
                        }
                    })(i)
                }

                fragment.appendChild(el)
            }
            paginationEl.appendChild(fragment)
        }

        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
            })

            kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
                infowindow.open(map, marker)
            })
        }
    }, [searchPlace])

    return (
        <div>
            <div
                id="myMap"
                style={{
                    width: '98%',
                    height: '500px',
                    float: 'left',
                    marginLeft: '20px',
                    marginRight: '5px',
                    border: '1px solid green'
                }}>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            <table style={{ marginTop: '50px', marginLeft: '20px' }}>
                <thead>
                    <tr style={{ fontWeight: '900', width: '100%', marginLeft: '10px', textAlign: 'center', fontSize: '20px' }}>
                        <td style={{ width: '411px', border: '1px solid black', background:"gray" }}>이름</td>
                        <td style={{ width: '411px', border: '1px solid black', background:"gray" }}>도로명 주소</td>
                        <td style={{ width: '411px', border: '1px solid black', background:"gray" }}>지번 주소</td>
                        <td style={{ width: '411px', border: '1px solid black', background:"gray" }}>연락처</td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div id="result-list">
                <table style={{ width: '100%', marginLeft: '20px' }}>
                    <thead></thead>
                    {Places.map((item, i) => (
                        <div key={i}>
                            <tbody>
                                <tr style={{ fontWeight: '900', width: '100%', marginLeft: '10px', textAlign: 'center' }}>
                                    <td style={{ width: '411px', border: '1px solid black' }}>{item.place_name}</td>
                                    <td style={{ width: '411px', border: '1px solid black' }}>{item.road_address_name}</td>
                                    <td style={{ width: '411px', border: '1px solid black' }}>{item.address_name}</td>
                                    <td style={{ width: '411px', border: '1px solid black' }}>{item.phone}</td>
                                </tr>
                            </tbody>
                        </div>
                    ))}
                </table>
            </div>
            <div style={{
                float: 'right',
                color: 'lightblue',
                fontWeight: 'bold',
                marginTop: '2px',
                marginRight: '2px',
                fontSize: '20px',
                textDecoration: 'none',
                margin: '0 10px'
            }}
                id="pagination"></div>
        </div>
    )
}

export default KakaomapContainer
