import Image from "next/image";
import { Button } from "./ui/button";

const SocialButton = ({ icon, altText }) => {
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="rounded-full border-default-300 hover:bg-transparent"
    >
      <Image src={icon} alt={altText} className="w-6 h-6" />
    </Button>
  );
};

export default SocialButton; 