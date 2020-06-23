import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import { ImageCarousel } from "../common/img-carousel/ImageCarousel";
import { Modal } from "../common/modal/Modal";
import { FacebookOauthButton } from "../common/oauth-button/FacebookOauthButton";
import { GoogleOauthButton } from "../common/oauth-button/GoogleOauthButton";
import { ForgotPasswordModal } from "../forgotpassword-modal/ForgotPasswordModal";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export const StartPage = () => {
  const [toggleForms, setToggleForms] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleFunction = () => setToggleForms((prev) => !prev);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        closeFunction={closeModal}
        modalContent={<ForgotPasswordModal closeFunction={closeModal} />}
      />
      <div className="mt-16">
        <div className="text-white text-center">
          <h1 className="font-rokkit text-5xl leading-min">WEATHERY</h1>
          <p>What is the weather like today?</p>
        </div>
        <div className="container-base rounded mt-6">
          <div className="py-8 px-5 divide-y divide-gray-400">
            <section>
              {/*container inner*/}
              <AnimatePresence>
                {toggleForms ? (
                  <SignupForm />
                ) : (
                  <LoginForm openForgotPasswordModal={openModal} />
                )}
              </AnimatePresence>
            </section>
            <section className="text-center mt-4">
              <p className="text-muted text-sm mt-2">Or log in with</p>
              {/* <!-- OAuth Buttons --> */}
              <div className="flex justify-between mt-3">
                <FacebookOauthButton />
                <GoogleOauthButton />
              </div>
              {/* <!-- Link to Signup --> */}
              <div className="flex justify-center mt-5">
                {toggleForms ? (
                  <>
                    <p className="mr-2">Already have an account?</p>
                    <p className="link" onClick={toggleFunction}>
                      Sign in
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mr-2">Don’t have an account yet?</p>
                    <p className="link" onClick={toggleFunction}>
                      Sign up
                    </p>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
        <div className="container-right hidden">
          <h1 className="title text-light txt-big">WEATHERY</h1>
          <p className="subtitle text-light">What is the weather like today?</p>
          <ImageCarousel />
        </div>
      </div>
    </>
  );
};
