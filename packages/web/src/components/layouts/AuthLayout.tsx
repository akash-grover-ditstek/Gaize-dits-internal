import React from "react";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import Colors from "../../util/Colors";
import { media } from "../../util/MediaQuery";

const AuthContainer = styled.div`
   height: 100vh;
   width: 100%;
   background: ${Colors.background};
   display: flex;
   align-items: center;
   justify-content: center;
   @media screen and (max-width: 991px) {
      height: 100vh;
      padding: 20px;
      overflow-y: auto;
      align-items: flex-start;
   }
`;

const FormContainer = styled.div`
   display: flex;
   align-items: center !important;
   justify-content: center !important;
   background: ${Colors.white};
   border-radius: 5px;
   box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
   box-sizing: border-box;

   ${media.desktop`
    &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
    overflow-y:auto;
    width: 450px;
    padding: 20px;
    height: auto;
  `};

   ${media.mobile`
      height: 100%;
      overflow: auto;
      width: 100%;
      padding: 15px;
      align-items: flex-start;
      justify-content: flex-start;
  `};
`;

const AuthLayout = ({ children }: { children: JSX.Element }) => {
   return (
      <>
         <AuthContainer>
            <Toaster
               toastOptions={{
                  // Define default options
                  className: "",
                  duration: 2000,
                  style: {
                     background: "#363636",
                     color: "#fff",
                     fontSize: "14px",
                  },
                  success: {
                     style: {
                        background: "green",
                     },
                  },
                  error: {
                     style: {
                        background: "red",
                     },
                  },
               }}
               position="bottom-right"
            />
            <FormContainer>{children}</FormContainer>
         </AuthContainer>
      </>
   );
};

export default AuthLayout;
