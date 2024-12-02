"use client";
import { BASE_URL } from "@/Config";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
  const [qrImage, setQrImage] = useState(null);
  const enableTwoFA = async () => {
    try {
      const token = localStorage.getItem("star_authToken");

      if (!token) {
        console.error("Authorization token is missing.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/user/setup2fa`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const data = response.data;

      if (data.qrCodeUrl) {
        setQrImage(data.qrCodeUrl);
      }

      console.log("2FA Setup Response:", data);
    } catch (error) {
      console.error("Error enabling 2FA:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <button
        onClick={enableTwoFA}
        className="border border-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-500 hover:text-black transition-all"
      >
        Set Up 2FA
      </button>
      {qrImage && <img src={qrImage} alt="" />}
    </div>
  );
};

export default Page;
