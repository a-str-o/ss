import Image from "next/image";
import { Icon } from "@iconify/react";
import background from "@/public/images/auth/line.png";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onPlayClick }) => {
  return (
    <div className="basis-1/2 bg-primary w-full relative hidden xl:flex justify-center items-center bg-gradient-to-br from-primary-600 via-primary-400 to-primary-600">
      <Image
        src={background}
        alt="image"
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="relative z-10 backdrop-blur bg-primary-foreground/40 py-14 px-16 2xl:py-[84px] 2xl:pl-[50px] 2xl:pr-[136px] rounded max-w-[640px]">
        <div>
          <Button
            className="bg-transparent hover:bg-transparent h-fit w-fit p-0"
            onClick={onPlayClick}
          >
            <Icon
              icon="heroicons:play-solid"
              className="text-primary-foreground h-[78px] w-[78px] -ml-2"
            />
          </Button>
          <div className="text-4xl leading-[50px] 2xl:text-6xl 2xl:leading-[72px] font-semibold mt-2.5">
            <span className="text-default-600 dark:text-default-300 ">
              Unlock <br />
              Your Project <br />
            </span>
            <span className="text-default-900 dark:text-default-50">
              Performance
            </span>
          </div>
          <div className="mt-5 2xl:mt-8 text-default-900 dark:text-default-200 text-2xl font-medium">
            You will never know everything. <br />
            But you will know more...
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
