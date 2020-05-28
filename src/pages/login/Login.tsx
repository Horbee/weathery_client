import React from "react";

import { FacebookOauthButton } from "../common/FacebookOauthButton";
import { GoogleOauthButton } from "../common/GoogleOauthButton";
import { ImageCarousel } from "../common/img-carousel/ImageCarousel";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <div className="flex-center vh100">
      <div className="container-base container-left">
        <div className="container-inner">
          <h3 className="title">Log In</h3>
          <p className="subtitle mt-15">
            Log in to your account to upload or download pictures, videos or
            music.
          </p>

          <LoginForm />

          <div className="divider"></div>
          <p className="flex-center text muted m-10">Or log in with</p>

          {/* <!-- OAuth Buttons --> */}
          <div className="flex-justify-even">
            <FacebookOauthButton />
            <GoogleOauthButton />
          </div>

          {/* <!-- Link to Signup --> */}
          <div className="flex-center m-10">
            <p className="text m-0 mr-2">Don’t have an account yet?</p>
            <a href="#" className="link">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="container-base container-right flex-center flex-column">
        <h1 className="title text-light txt-big">WEATHERY</h1>
        <p className="subtitle text-light">What is the weather like today?</p>
        <ImageCarousel />
      </div>
    </div>
  );
};
