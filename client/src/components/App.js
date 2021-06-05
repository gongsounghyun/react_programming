import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';
import imageUpload from './views/ImageUpload/ImageUpload';
import imageLandingPage from './views/ImageLandingPage/ImageLandingPage';
import FrontPage from './views/FrontPage/FrontPage';
import BigthreePage from './views/BigthreePage/BigthreePage'
import ImageDetail from './views/ImageDetailPage/ImageDetailPage'
import Mypage from './views/Mypage/Mypage'
import FreeBoardPage from './views/FreeBoardPage/FreeBoardPage';
import NewPost from './views/FreeBoardPage/NewPost';
import FreeBoardDetailPage from './views/FreeBoardPage/FreeBoardDetailPage';
import Map from './views/Map/Kakaomap'
import Tournament from './views/Tournament/Tournament';
import FoodInfoPage from './views/FoodInfoPage/FoodInfoPage';
import SteroidInfoPage from './views/SteroidInfoPage/SteroidInfoPage';
import EatLogPage from './views/EatLogPage/EatLogPage';
import Healthinfo from './views/HealthInfo/Healthinfo';



//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(FrontPage, null)} />
          <Route exact path="/landing" component={Auth(LandingPage, null)} />
          <Route exact path="/image" component={Auth(imageLandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/image/upload" component={Auth(imageUpload, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, true)} />
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
          <Route exact path="/bigthree" component={Auth(BigthreePage, null)} />
          <Route exact path="/image/:imageId" component={Auth(ImageDetail, true)} />
          <Route exact path="/Mypage" component={Auth(Mypage, true)} />
          <Route exact path="/freeboard" component={Auth(FreeBoardPage, true)} />
          <Route exact path="/newpost" component={Auth(NewPost, true)} />
          <Route exact path="/freeboard/:freeboardId" component={Auth(FreeBoardDetailPage, true)} />
          <Route exact path="/Map" component={Auth(Map, true)} />
          <Route exact path="/Tournament" component={Auth(Tournament, true)} />
          <Route exact path="/foodInfo" component={Auth(FoodInfoPage, null)} />
          <Route exact path="/steroidinfo" component={Auth(SteroidInfoPage, null)} />
          <Route exact path="/eatlog" component={Auth(EatLogPage, true)} />
          <Route exact path="/Healthinfo" component={Auth(Healthinfo, true)} />

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
