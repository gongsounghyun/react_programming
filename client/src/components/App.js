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


        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
