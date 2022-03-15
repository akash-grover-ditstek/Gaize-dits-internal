import React, { useState } from "react";
import Button from "../components/elements/button/Button";
import styled from "styled-components";
import Colors from "../util/Colors";
import Input from "../components/elements/Input";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { errorMessages, successMessages } from "../config/messages.config";
import { Link } from "react-router-dom";
import Icon from "../components/elements/icons/Icon";
import { IconEnum as Icons } from "../components/elements/icons/Icons";
import routePaths from "../config/routepaths.config";

Amplify.configure(awsconfig);

function useQuery() {
   return new URLSearchParams(useLocation().search);
}
const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 90%;
`;

const Content = styled.div`
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
   position: relative;
   padding: 50px 0;
`;

const Title = styled.div`
   font-size: 1.4rem;
   font-weight: 500;
   color: ${Colors.grey3};
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

const ResetPassword = () => {
   const navigate = useNavigate();
   const [otp, setOtp] = useState("");
   const [emailId, setEmailId] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [verifiedOtp, setVerifiedOtp] = useState(false);
   const [loading, setLoading] = useState(false);

   const query = useQuery();

   async function resetPassword() {
      setLoading(true);
      const email = query.get("email");
      if (email) {
         if (newPassword !== confirmPassword) {
            toast.error(errorMessages.PASSWORD_NOT_MATCHED);
         } else {
            try {
               const response = await Auth.forgotPasswordSubmit(
                  email,
                  otp,
                  newPassword
               );
               if (response) {
                  toast.success(successMessages.PASSWORD_CHANGED_SUCCESS);
                  navigate(routePaths.LOGIN);
               }
            } catch (error: any) {
               if (error.message) {
                  toast.error(error.message);
                  setVerifiedOtp(false);
               }
            }
         }
      }
      setLoading(false);
   }
   const validateInput = () => {
      if (otp) {
         setVerifiedOtp(true);
         setLoading(false);
      }
   };
   return (
      <>
         <Content>
            {!verifiedOtp && (
               <>
                  {" "}
                  <Title>Verify Passcode</Title>
                  <Form
                     onSubmit={(e) => {
                        e.preventDefault();
                        validateInput();
                     }}
                  >
                     <Input
                        type="text"
                        header="Verification Code"
                        placeholder="Please enter verification code"
                        value={otp}
                        required
                        width="100%"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                           setOtp(e.target.value)
                        }
                     />
                     <Button
                        margin="0px 0px 30px 0px"
                        text="Next"
                        type="submit"
                        width="100%"
                        loading={loading}
                        disabled={loading}
                     />
                  </Form>
               </>
            )}
            {verifiedOtp && (
               <>
                  {" "}
                  <Title>Reset Password</Title>
                  <Form
                     onSubmit={(e) => {
                        e.preventDefault();
                        resetPassword();
                     }}
                  >
                     <Input
                        type="password"
                        header="New Password"
                        placeholder="Please enter new password"
                        value={newPassword}
                        required
                        minLength="8"
                        width="100%"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                           setNewPassword(e.target.value)
                        }
                     />
                     <Input
                        type="password"
                        header="Confirm Password"
                        placeholder="Please enter confirm password"
                        value={confirmPassword}
                        required
                        minLength="8"
                        width="100%"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                           setConfirmPassword(e.target.value)
                        }
                     />
                     <Button
                        margin="0px 0px 30px 0px"
                        text="Save"
                        type="submit"
                        width="100%"
                        loading={loading}
                        disabled={loading}
                     />
                  </Form>
               </>
            )}
            <BackContainer onClick={() => {}}>
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
export default ResetPassword;
