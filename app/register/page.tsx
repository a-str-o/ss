"use client";
import { useState } from "react";
import HeroSection from "@/components/ HeroSection";
import RegisterFormContainer from "@/components/RegisterFormContainer";
// import VideoDialog from "@/components/VideoDialog";

const RegisterPage = () => {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-background flex items-center overflow-hidden w-full">
        <div className="min-h-screen basis-full flex flex-wrap w-full justify-center overflow-y-auto">
          <HeroSection onPlayClick={() => setOpenVideo(true)} />
          <RegisterFormContainer />
        </div>
      </div>
      {/* <VideoDialog open={openVideo} onClose={() => setOpenVideo(false)} /> */}
    </>
  );
};

export default RegisterPage;
