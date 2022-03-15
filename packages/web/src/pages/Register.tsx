import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../util/Colors";
import Input from "../components/elements/Input";
import Button from "../components/elements/button/Button";
import { Link } from "react-router-dom";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import IUserRegister from "../models/interfaces/IUserRegister";
import { apiService } from "../services/api.service";
import { localStorageService } from "../services";
import routePaths from "../config/routepaths.config";
import { API_URLS } from "../config/api.config";
import PhoneNumberInput from "../util/PhoneNumberInput";

Amplify.configure(awsconfig);

const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
`;

const TopText = styled.div`
   font-size: 1.4rem;
   text-align: center;
   color: ${(props) => props.color || `${Colors.grey3}`};
`;

const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   height: 100%;
   width: 100%;
   justify-content: center;
   @media screen and (max-width: 767px) {
      align-items: flex-start;
      justify-content: flex-start;
   }
`;

const BottomText = styled.div`
  font-size: .9rem;
  color: ${(props) => props.color || `${Colors.grey3}`};
  cursor: ${(props) => (props.onClick ? "pointer" : null)};
  &:hover{
   color: ${(props) => (props.onClick ? `${Colors.lightblue}` : null)};
`;

const NameContainer = styled.div`
   display: flex;
   justify-content: space-between;
   width: 100%;
`;
const Flex = styled.div`
   display: flex;
`;

const TOS = styled.div`
   color: ${Colors.grey3};
   margin: 15px 0px 10px 0px;
   text-align: center;
   font-size: 0.9rem;
`;

const TOSLink = styled.a`
   color: ${Colors.blue};
   &:hover {
      color: ${Colors.lightblue};
   }
`;

const Spacer = styled.div`
   width: 15px;
`;

const Register = () => {
   const navigate = useNavigate();
   const [registerForm, setRegisterForm] = useState<IUserRegister>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      organizationName: "",
   });
   const [loading, setLoading] = useState(false);

   async function signUp() {
      setLoading(true);
      try {
         const response = await Auth.signUp({
            username: registerForm.email,
            password: registerForm.password,
            attributes: {
               "custom:firstName": registerForm.firstName,
               "custom:lastName": registerForm.lastName,
               email: registerForm.email, // optional
               phone_number: `+${registerForm.phoneNumber}`, // optional - E.164 number convention
               // other custom attributes
            },
         });
         localStorageService.storeUserSub(response.userSub);
         registerUser(response.userSub);
      } catch (error: any) {
         setLoading(false);
         toast.error(error.message);
      }
   }
   const registerUser = (userName) => {
      apiService.post(
         API_URLS.REGISTER,
         {
            email: registerForm.email,
            userName,
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            phoneNumber: `+${registerForm.phoneNumber}`,
            organizationName: registerForm.organizationName,
         },
         (response) => {
            navigate(`${routePaths.CONFIRM_EMAIL}?email=${registerForm.email}`);
         },
         () => {
            setLoading(false);
         }
      );
   };
   return (
      <Content>
         <TopText>Let's Create an account.</TopText>
         <Form
            onSubmit={(e) => {
               e.preventDefault();
               signUp();
            }}
         >
            <NameContainer>
               <Input
                  type="text"
                  header="First Name"
                  value={registerForm.firstName}
                  required
                  width="100%"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                     setRegisterForm((prevState) => ({
                        ...prevState,
                        firstName: e.target.value,
                     }));
                  }}
               />
               <Spacer />
               <Input
                  type="text"
                  header="Last Name"
                  value={registerForm.lastName}
                  required
                  width="100%"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                     setRegisterForm((prevState) => ({
                        ...prevState,
                        lastName: e.target.value,
                     }))
                  }
               />
            </NameContainer>
            <Input
               type="email"
               header="Email"
               value={registerForm.email}
               required
               width="100%"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegisterForm((prevState) => ({
                     ...prevState,
                     email: e.target.value,
                  }))
               }
            />
            <Input
               type="text"
               header="Organization"
               value={registerForm.organizationName}
               required
               width="100%"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegisterForm((prevState) => ({
                     ...prevState,
                     organizationName: e.target.value,
                  }))
               }
            />
            <PhoneNumberInput
               label="Phone Number"
               key={5}
               margin="20px 0px 8px 0px"
               value={registerForm.phoneNumber}
               onChange={(value: string) =>
                  setRegisterForm((prevState) => ({
                     ...prevState,
                     phoneNumber: value,
                  }))
               }
            />

            <Input
               type="password"
               header="Password"
               value={registerForm.password}
               required
               width="100%"
               minLength={"8"}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegisterForm((prevState) => ({
                     ...prevState,
                     password: e.target.value,
                  }))
               }
            />
            <TOS>
               By registering, you agree to Gaize's&nbsp;
               <TOSLink href="#" target="_blank" rel="noopener noreferrer">
                  Terms of Use and Privacy Policy
               </TOSLink>
            </TOS>
            <Button
               margin="0px 0px 30px 0px"
               text="Register"
               type="submit"
               width="100%"
               loading={loading}
               disabled={loading}
            />
         </Form>
         <Flex>
            <BottomText>Already have an account?</BottomText>
            <Link to="/login">
               <BottomText color={Colors.blue}>
                  &nbsp;&nbsp;&nbsp;Sign In
               </BottomText>
            </Link>
         </Flex>
      </Content>
   );
};

export default Register;
