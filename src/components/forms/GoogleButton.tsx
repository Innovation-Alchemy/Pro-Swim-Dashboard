import googleIcon from "../../assets/Google_Icon.svg";
import { Button } from "../ui/button";

const GoogleButton = () => {
  const handleGoogleAuth = () => {
    // handle google auth
  };
  return (
    <Button
      onClick={handleGoogleAuth}
      className="flex gap-4 items-center"
    >
      <img src={googleIcon} alt="google" className="w-5 h-5" />
      Login With Google
    </Button>
  );
};

export default GoogleButton;
