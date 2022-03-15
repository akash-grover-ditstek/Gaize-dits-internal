import React, { useEffect, useState } from "react";
import Button from "../components/elements/button/Button";
import styled from "styled-components";
import Input, { PhoneNumberInput } from "../components/elements/Input";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { successMessages } from "../config/messages.config";
import Colors from "../util/Colors";
import Icon from "../components/elements/icons/Icon";
import { IconEnum as Icons } from "../components/elements/icons/Icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiService } from "../services/api.service";
import { localStorageService } from "../services";
import routePaths from "../config/routepaths.config";
import { API_URLS } from "../config/api.config";

Amplify.configure(awsconfig);

function useQuery() {
   return new URLSearchParams(useLocation().search);
}
const MainContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   height: 100vh;
   width: 100%;
   justify-content: center;
   width: 700px;
   margin: 0 auto;
`;
const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
`;

const Content = styled.div`
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   position: relative;
   width: 100%;
   height: 100%;
   padding: 50px 0;
`;

const Title = styled.div`
   font-size: 1.4rem;
   text-align: left;
   color: ${(props) => props.color || `${Colors.grey3}`};
`;
const ButtonWrapper = styled.form`
   display: flex;
   align-items: center;
   column-gap: 10px;
   margin: 10px 0 0;
`;

const BottomText = styled.div`
   font-size: 1rem;
   color: ${(props) => props.color || `${Colors.grey3}`};
   cursor: ${(props) => (props.onClick ? "pointer" : null)};
`;
const LinkText = styled.a`
   margin-top: 10px;
   font-size: 1rem;
   color: ${Colors.blue};
   align-self: baseline;
   cursor: pointer;
   &:hover {
      color: ${Colors.lightblue};
   }
`;

const BackContainer = styled.div`
   display: flex;
   cursor: pointer;
   position: absolute;
   align-items: center;
   top: 0px;
   left: 0px;
`;

const BackText = styled.div`
   color: ${Colors.grey3};
   font-size: 1rem;
   &:hover {
      color: ${Colors.blue};
   }
`;

const ConfirmEmail = () => {
   const navigate = useNavigate();
   const [otp, setOtp] = useState("");
   const [userDetail, setUserDetail] = useState([]);
   const [loading, setLoading] = useState(false);

   const query = useQuery();
   const resent = query.get("resent");

   async function confirmOtp() {
      setLoading(true);
      const email = query.get("email");
      try {
         const response = await Auth.confirmSignUp(email as string, otp);
         setLoading(false);
         toast.success(successMessages.EAMIL_VERIFIED_SUCCESS);
         emailConfirmed();
      } catch (error: any) {
         toast.error(error.message);
         setLoading(false);
      }
   }
   async function resendConfirmationCode() {
      const email = query.get("email");
      try {
         await Auth.resendSignUp(email as string);
         toast.success(successMessages.RESEND_CODE_SUCCESS);
      } catch (err: any) {
         toast.error(err.message);
      }
   }

   const emailConfirmed = () => {
      apiService.post(
         API_URLS.UPDATEUSER,
         {
            emailVerified: true,
            userName: localStorageService.getUserSub(),
         },
         (response) => {
            navigate(routePaths.LOGIN);
         },
         () => { }
      );
   };

   useEffect(() => {
      if (resent) {
         resendConfirmationCode();
      }
   }, []); // eslint-disable-line
   return (
      <>
         <Content>
            <Title>Email Verification</Title>
            <Form
               onSubmit={(e) => {
                  e.preventDefault();
                  confirmOtp();
               }}
            >
               <Input
                  type="text"
                  header="Verification Code"
                  placeholder="Please enter email verification code"
                  value={otp}
                  required
                  width="100%"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setOtp(e.target.value)
                  }
               />
               <Button
                  margin="0px 0px 30px 0px"
                  text="Confirm"
                  type="submit"
                  width="100%"
                  loading={loading}
                  disabled={loading}
               />
               <BottomText>
                  Didn't receive a code ?{" "}
                  <LinkText onClick={resendConfirmationCode}>Resend</LinkText>
               </BottomText>
            </Form>
            <BackContainer onClick={() => { }}>
               <Link to="/login">
                  <BackText>
                     <Icon
                        icon={Icons.Back}
                        size={14}
                        active
                        activeColor={Colors.lightblue}
                     />
                     &nbsp;Back
                  </BackText>
               </Link>
            </BackContainer>
         </Content>
      </>
   );
};
export default ConfirmEmail;
