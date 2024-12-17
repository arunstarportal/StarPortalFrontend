import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { BASE_URL } from "@/Config";
import { setUserProfileData } from "@/redux/userProfileSlice";

const useVerifyFromBackend = (sessionToken) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const verifyFromBackend = async () => {
      if (!sessionToken) return;
      console.log("Token verification ran!");

      try {
        // const payload = {
        //   idToken: sessionToken.accessToken,
        // };
        const payload = sessionToken.user.message
        ? { message: sessionToken.user.message , signature: sessionToken.user.signature, nonce: sessionToken.user.nonce, address: sessionToken.user.address }
        : { idToken: sessionToken.accessToken };


        console.log("🚀 ~ verifyFromBackend ~ payload:", payload)

        
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
            is2faEnbaled: false,
          };

          localStorage.setItem("star_authTokens", JSON.stringify(userData));
          dispatch(setUserProfileData(data));
          router.push("/");
        }
      } catch (error) {
        console.log("Error during verification:", error);
        signOut();
      }
    };

    verifyFromBackend();
  }, [sessionToken, dispatch, router]);

  return null; // Hooks don't return UI; use null.
};

export default useVerifyFromBackend;
