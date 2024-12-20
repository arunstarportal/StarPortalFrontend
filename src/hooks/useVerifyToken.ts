import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { BASE_URL } from "@/Config";
import { setUserProfileData } from "@/redux/userProfileSlice";

const useVerifyFromBackend = (sessionToken) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const verifyFromBackend = async () => {
      if (!sessionToken || isVerifying) return;
      console.log("Token verification ran!");

      // setIsVerifying(true);

      try {
        const payload = sessionToken.user.message
          ? {
              message: sessionToken.user.message,
              signature: sessionToken.user.signature,
              nonce: sessionToken.user.nonce,
              address: sessionToken.user.address,
            }
          : { idToken: sessionToken.accessToken };

        const response = await axios.post(
          `${BASE_URL}/user/verify_oAuth`,
          payload
        );

        const data = response.data;
        if (response.status === 200 && data.message === "Verified") {
          const userData = {
            token: data.token,
            eth_Address: data.user.ethereumWalletAddress,
            sol_Address: data.user.solanaWalletAddress,
            name: data.user.name,
            profileIcon: data.user.picture,
            is2faEnabled: data.user.is2faEnabled,
          };

          localStorage.setItem("star_authTokens", JSON.stringify(userData));
          dispatch(setUserProfileData(data));
          router.push("/");
          setIsVerifying(true);
        }
      } catch (error) {
        console.log("Error during verification:", error);
        signOut();
      }
    };

    verifyFromBackend();
  }, [sessionToken, dispatch, router, isVerifying]);

  return null; // Hooks don't return UI; use null.
};

export default useVerifyFromBackend;
