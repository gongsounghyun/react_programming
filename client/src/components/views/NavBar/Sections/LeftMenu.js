import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="image_search">
      <a href="/image">이미지</a>
    </Menu.Item>
    <Menu.Item key="video_search">
      <a href="/landing">비디오</a>
    </Menu.Item>
    <Menu.Item key="bigthree">
      <a href="/bigthree">3대측정</a>
    </Menu.Item>
    <Menu.Item key="subscription">
      <a href="/subscription">구독 목록</a>
    </Menu.Item>
    <Menu.Item key="freeboard">
      <a href="/freeboard">게시판</a>
    </Menu.Item>
    <Menu.Item key="Tournament">
      <a href="/Tournament">대회 정보</a>
    </Menu.Item>
    <Menu.Item key="Map">
      <a href="/Map">운동 시설 검색</a>
    </Menu.Item>
    <Menu.Item key="foodinfo">
        <a href="/foodinfo">음식정보</a>
      </Menu.Item>
  </Menu>
  )
}

export default LeftMenu