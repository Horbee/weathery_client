import React, { useState } from "react";

import { ImageCarousel } from "../common/img-carousel/ImageCarousel";
import { FacebookOauthButton } from "../common/oauth-button/FacebookOauthButton";
import { GoogleOauthButton } from "../common/oauth-button/GoogleOauthButton";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const StartPage = () => {
  const [toggleForms, setToggleForms] = useState(false);

  const toggleFunction = () => setToggleForms((prev) => !prev);

  return (
    <div className="flex-center vh100">
      <div className="container-base container-left">
        <div className="container-inner">
          {toggleForms ? <SignupForm /> : <LoginForm />}

          <div className="divider"></div>
          <p className="flex-center text muted m-10">Or log in with</p>

          {/* <!-- OAuth Buttons --> */}
          <div className="flex-justify-even">
            <FacebookOauthButton />
            <GoogleOauthButton />
          </div>

          {/* <!-- Link to Signup --> */}
          <div className="flex-center m-10">
            {toggleForms ? (
              <>
                <p className="text m-0 mr-2">Already have an account?</p>
                <p className="link" onClick={toggleFunction}>
                  Sign in
                </p>
              </>
            ) : (
              <>
                <p className="text m-0 mr-2">Don’t have an account yet?</p>
                <p className="link" onClick={toggleFunction}>
                  Sign up
                </p>
              </>
            )}
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