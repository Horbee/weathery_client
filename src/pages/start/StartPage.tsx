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
        containerClassName="w-full"
      />
      <div className="mt-16 md:h-screen md:mt-0 md:flex md:flex-col md:justify-center lg:mx-4 xl:flex-row xl:items-center">
        <div className="text-white text-center xl:hidden">
          <h1 className="font-rokkit text-5xl md:text-6xl leading-min">
            WEATHERY
          </h1>
          <p>What is the weather like today?</p>
        </div>
        <div className="container container-left mx-auto container-base rounded md:rounded-lg xl:rounded-l-lg xl:rounded-r-none mt-6 xl:m-0 xl:h-full">
          <div className="py-8 px-5 md:px-10 md:py-10 divide-y divide-gray-400">
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
              <p className="text-muted text-sm mt-2 xl:mt-8">Or log in with</p>
              {/* <!-- OAuth Buttons --> */}
              <div className="flex justify-between mt-3 xl:mt-6">
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
        <div className="container-right container-base hidden xl:block xl:h-full p-10">
          <div className="text-center mt-3">
            <h1 className="font-rokkit text-white text-5xl md:text-6xl leading-min">
              WEATHERY
            </h1>
            <p className="subtitle text-white">
              What is the weather like today?
            </p>
          </div>
          <div className="mt-16">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </>
  );
};
