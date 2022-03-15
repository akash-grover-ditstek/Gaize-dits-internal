import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../util/Colors";
import Input from "../components/elements/Input";
import Button from "../components/elements/button/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import toast from "react-hot-toast";
import Icon from "../components/elements/icons/Icon";
import { IconEnum as Icons } from "../components/elements/icons/Icons";
import routePaths from "../config/routepaths.config";
import { successMessages } from "../config/messages.config";

const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
`;

const TopText = styled.div`
   font-size: 1.4rem;
   text-align: left;
   color: ${(props) => props.color || `${Colors.grey3}`};
`;
const SmallText = styled.div`
   font-size: 0.9rem;
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
   padding: 50px 0;
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

function ForgotPassword() {
   const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();
   async function forgotPassword() {
      setLoading(true);
      try {
         const response = await Auth.forgotPassword(email);
         if (response.CodeDeliveryDetails) {
            toast.success(successMessages.VERIFICATION_CODE_SENT);
            navigate(`${routePaths.RESET_PASSWORD}?email=${email}`);
         }
      } catch (error: any) {
         toast.error(error.message);
      }
      setLoading(false);
   }
   return (
      <Content>
         <TopText>Forgot your password?</TopText>
         <SmallText>
            Please enter the email you use to sign in to Gaize.
         </SmallText>
         <Form
            onSubmit={(e) => {
               e.preventDefault();
               forgotPassword();
            }}
         >
            <Input
               header="Email"
               type="email"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               width="100%"
            />
            <Button
               margin="40px 0px"
               text="Continue"
               type="submit"
               width="fit-content"
               loading={loading}
               disabled={loading}
            />
         </Form>
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
   );
}

export default ForgotPassword;
