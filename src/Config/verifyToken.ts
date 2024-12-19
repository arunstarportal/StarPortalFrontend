import axios from "axios";
import { BASE_URL } from ".";
import { setUserProfileData } from "@/redux/userProfileSlice";

export const verifyFromBackend = async (
  sessionToken,
  dispatch,
  router,
  signOut
) => {
  try {
    const payload = {
      idToken: sessionToken.accessToken,
    };
    const response = await axios.post(`${BASE_URL}/user/verify_oAuth`, payload);
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

      // localStorage.setItem("star_authTokens", JSON.stringify(userData));
      await dispatch(setUserProfileData(data));

      router.push("/");
    }
  } catch (error) {
    console.log("error from the back", error);
    signOut();
  }
};
