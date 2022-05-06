import queryString from "query-string";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { ApiResponse } from "../../api/models/ApiResponse";
import { AuthResponse } from "../../api/models/AuthResponse";
import { AppRoutes } from "../../constants/routes";
import { useAuthService } from "../../service/auth/useAuthService";
import { ImageCarousel } from "../common/img-carousel/ImageCarousel";

interface SocialAuthCallbackProps {
  loginFunction: (params: any) => Promise<ApiResponse<AuthResponse>>;
}

export const SocialAuthCallback = ({
  loginFunction,
}: SocialAuthCallbackProps) => {
  const { setupAuth } = useAuthService();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = queryString.parse(window.location.search);
      const {
        data: { token },
      } = await loginFunction(params);
      setupAuth(token);
      navigate(AppRoutes.Home);
    };

    handleCallback();
  }, []);

  return (
    <div className="mt-16 md:h-screen md:mt-0 md:flex md:flex-col md:justify-center lg:mx-4 xl:flex-row xl:items-center">
      <div className="text-white text-center xl:hidden">
        <h1 className="font-rokkit text-5xl md:text-6xl leading-min">
          WEATHERY
        </h1>
        <p>What is the weather like today?</p>
      </div>

      <div className="container container-left mx-auto container-base rounded md:rounded-lg xl:rounded-l-lg xl:rounded-r-none mt-6 xl:m-0 xl:h-full">
        <div className="py-8 px-5 h-full md:px-10 md:py-10 divide-y divide-gray-400">
          <section className="h-full flex flex-col items-center justify-center">
            <h3 className="font-rokkit text-deepBlue text-4xl">Logging In</h3>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </section>
        </div>
      </div>
      <div className="container-right container-base hidden xl:block xl:h-full p-10">
        <div className="text-center mt-3">
          <h1 className="font-rokkit text-white text-5xl md:text-6xl leading-min">
            WEATHERY
          </h1>
          <p className="subtitle text-white">What is the weather like today?</p>
        </div>
        <div className="mt-16">
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};
