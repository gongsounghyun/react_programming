/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
const { SubMenu } = Menu;
function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mypage">
          <a href="/Mypage">내정보</a>
        </Menu.Item>
        <SubMenu key="sub4" title="업로드">
          <Menu.Item key="uploadimage">
            <a href="/image/upload">이미지</a>
          </Menu.Item>
          <Menu.Item key="uploadvideo">
            <a href="/video/upload">비디오</a>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
