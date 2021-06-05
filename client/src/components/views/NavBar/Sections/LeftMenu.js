import React from "react";
import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">홈</a>
      </Menu.Item>
      <Menu.Item key="image_search">
        <a href="/image">이미지</a>
      </Menu.Item>
      <Menu.Item key="video_search">
        <a href="/landing">비디오</a>
      </Menu.Item>

      <Menu.Item key="subscription">
        <a href="/subscription">유저 검색</a>
      </Menu.Item>
      <Menu.Item key="freeboard">
        <a href="/freeboard">게시판</a>
      </Menu.Item>
      <Menu.Item key="bigthree">
        <a href="/bigthree">3대측정</a>
      </Menu.Item>
      <SubMenu key="sub4" title="운동 정보">
        <Menu.Item key="Tournament">
          <a href="/Tournament">대회 정보</a>
        </Menu.Item>
        <Menu.Item key="Map">
          <a href="/Map">운동 시설 검색</a>
        </Menu.Item>
        <Menu.Item key="foodinfo">
          <a href="/foodinfo">음식정보</a>
        </Menu.Item>
        <Menu.Item key="steroidinfo">
          <a href="/steroidinfo">스테로이드 정보</a>
        </Menu.Item>
        <Menu.Item key="Healthinfo">
          <a href="/Healthinfo">부위별 운동 정보</a>
        </Menu.Item>
        <Menu.Item key="eatlog">
          <a href="/eatlog">식단 기록</a>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
