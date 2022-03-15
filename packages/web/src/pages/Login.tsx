import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Colors from "../util/Colors";
import Input from "../components/elements/Input";
import Button from "../components/elements/button/Button";
const Logo = require("../assets/images/logo.png");
import { Amplify, Auth, Cache } from "aws-amplify";
import awsconfig from "../aws-exports";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import IUserLogin from "../models/interfaces/IUserLogin";
import { errorMessages, successMessages } from "../config/messages.config";
import { apiService, localStorageService } from "../services";
import routePaths from "../config/routepaths.config";
import { API_URLS } from "../config/api.config";

Amplify.configure(awsconfig);

const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
`;

const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   height: 100%;
   width: 100%;
   justify-content: center;
   padding: 20px 0;
`;

const BottomText = styled.div`
   font-size: 1rem;
   color: ${(props) => props.color || `${Colors.grey3}`};
   cursor: ${(props) => (props.onClick ? "pointer" : null)};
`;

const LogoImage = styled.img`
   width: 100px;
   margin-bottom: 20px;
`;

const LinkText = styled.span`
   margin-top: 10px;
   font-size: 1rem;
   color: ${Colors.blue};
   align-self: baseline;
   cursor: pointer
   margin-left: 10px;
   &:hover {
      color: ${Colors.lightblue};
   }
`;

const Spacer = styled.div`
   height: 5px;
`;

const Linkcontainer = styled.div`
   font-size: 1rem;
   color: ${(props) => props.color || `${Colors.grey3}`};
   cursor: ${(props) => (props.onClick ? "pointer" : null)};
   &:hover {
      color: ${Colors.lightblue};
   }
`;

const Login = () => {
   const [loginForm, setLoginForm] = useState<IUserLogin>({
      email: "",
      password: "",
   });
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   /* Sign in function */
   async function signIn() {
      try {
         setLoading(true);
         let response = await Auth.signIn(loginForm.email, loginForm.password);
         if (response.attributes.email_verified) {
            // ============================================== Token ===========================================
            Auth.currentSession().then((res: any) => {
               let refreshToken = res.refreshToken.token
               localStorageService.storeAuthRefreshToken(refreshToken);
               let accessToken = res.getAccessToken();
               let jwt = accessToken.getJwtToken();
               localStorageService.storeAuthToken(jwt);
               apiService.get(
                  API_URLS.GETUSERDATA,
                  (response) => {
                     localStorageService.storeAuthUser(response.data);
                     if (!response.data.organization?.subscriptionId) {
                        localStorageService.storeUserSub(
                           response.data.user.userName
                        );
                        toast.success(successMessages.LOGIN_SUCCESS_To_STRIPE);
                        navigate(routePaths.STRIPE);
                     } else {
                        toast.success(successMessages.LOGIN_SUCCESS);
                        navigate(routePaths.HOME);
                     }
                  },
                  () => {
                     setLoading(false);
                  }
               );
            });
         }
      } catch (err: any) {
         // Move to user to confirm email screen
         if (err.message === errorMessages.EMAIL_NOT_CONFIRMED) {
            apiService.post(
               API_URLS.GETUSER_BY_EMAIL,
               { email: loginForm.email },
               (response) => {
                  if (response.data.user) {
                     localStorageService.storeUserSub(
                        response.data.user.userName
                     );
                     navigate(
                        `${routePaths.CONFIRM_EMAIL}?email=${loginForm.email}&resent=true`
                     );
                  }
               },
               () => {
                  setLoading(false);
               }
            );
         }
         toast.error(err.message);
         setLoading(false);
      }
   }

   return (
      <Content>
         <LogoImage src={Logo} />
         <Form
            onSubmit={(e) => {
               e.preventDefault();
               signIn();
            }}
         >
            <Input
               header="Email"
               type="email"
               value={loginForm.email}
               name={"email"}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginForm((prevState) => ({
                     ...prevState,
                     email: e.target.value,
                  }))
               }
               required
               width="100%"
            />
            <Input
               header="Password"
               type="password"
               value={loginForm.password}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLoginForm((prevState) => ({
                     ...prevState,
                     password: e.target.value,
                  }))
               }
               minLength="8"
               required
               width="100%"
            />
            <Spacer />
            <Link to="/forgotPassword">
               <LinkText>Forgot password?</LinkText>
            </Link>
            <Button
               margin="40px 0px"
               width="30%"
               text="Login"
               type="submit"
               padding="0px"
               loading={loading}
               disabled={loading}
            />
         </Form>
         <BottomText>
            Don't have an account ?
            <Link to="/register" color={Colors.blue}>
               <LinkText>&nbsp; Sign up</LinkText>
            </Link>
         </BottomText>
      </Content>
   );
};

export default Login;
