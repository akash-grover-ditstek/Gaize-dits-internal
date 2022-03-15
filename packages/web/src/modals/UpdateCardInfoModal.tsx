import React, { useContext, useState } from "react";
import styled from "styled-components";
import * as Polished from "polished";
import {
   CardNumberElement,
   CardExpiryElement,
   CardCvcElement,
   useStripe,
   useElements,
} from "@stripe/react-stripe-js";
import Button from "../components/elements/button/Button";
import colors from "../util/Colors";
import Icon from "../components/elements/Icon";
import { IconEnum as Icons } from "../components/elements/Icons";
import { getErrorMessage } from "../util/ErrorUtil";
import { apiService } from "../services/api.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { localStorageService } from "../services";
import { UserContext } from "../components/context/UserContext";
import routePaths from "../config/routepaths.config";
import { successMessages } from "../config/messages.config";
import { API_URLS } from "../config/api.config";
import Colors from "../util/Colors";

interface IElementContainer {
   focused?: boolean;
}
const Container = styled.div`
   position: relative;
   background-color: ${colors.white};
   width:100%;
   padding: 15px 20px;
   .Element {
      background: ${colors.white};
      border-radius: 10px;
      font-size: 14px;
      height: 40px;
      &.StripeElement--focus{
         border: 1px solid ${colors.blue} !important;
      }
      .__PrivateStripeElement {
         top: 50%;
         left: 34px;
         transform: translateY(-50%);
     }
   }
`;

const Form = styled.form`
   / display: flex; /
`;

const Row = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   margin-bottom: 15px;
   flex: 1;
`;

const Spacer = styled.div`
   flex: 0.075;
`;

const IconContainer = styled.div`
   position: absolute;
   top: 50%;
   left: 12px;
   transform: translatey(-50%);
`;

const Title = styled.div`
   font-size: 1.4rem;
   text-align: left;
   color: ${(props) => props.color || `${Colors.grey3}`};
`;

const ButtonContainer = styled.div`
   margin-top: 20px;
   display: flex;
   justify-content: flex-end;
   & Button:first-child{
    margin-right:10px;
   }
`;

const ElementContainer: React.FunctionComponent<IElementContainer> = styled.div<IElementContainer>`
   position: relative;
   top: 20px;
   flex: 1;

   .Element {
      border: 1px solid
         ${(props) => {
      if (props.focused) return colors.grey4;
      return colors.grey5;
   }};

      &:hover {
         border: 1px solid
            ${(props) => {
      if (props.focused) return colors.grey4;
      return Polished.darken(0.05, colors.blue);
   }};
      }
      &:focus {
         border: 1px solid
            ${(props) => {
      if (props.focused) return colors.grey4;
      return Polished.darken(0.05, colors.blue);
   }};
      }
   }
`;

const ElementsEnum: any = Object.freeze({
   CardNumber: "CardNumber",
   CVC: "CVC",
   ExpDate: "ExpDate",
});

const UpdateCardInfo = ({ close, getinfo }: any): any => {
   const { user }: any = useContext(UserContext);

   const stripe = useStripe();
   const elements = useElements();
   const [focused, setFocus] = React.useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      if (!stripe || !elements) {
         return;
      }
      const cardElement: any = elements.getElement(CardNumberElement);
      const tokenData: any = await stripe.createToken(cardElement);
      let error: any = tokenData.error;
      let token: any = tokenData.token;
      if (error) {
         toast.error(error.message);
         setLoading(false);
      } else if (token?.id) {
         UpdateCard(token.id);
      }
   };

   const style = {
      base: {
         fontSize: "14px",
         fontWeight: "300",
         color: colors.grey1,
         fontSmoothing: "antialiased",
         "::placeholder": {
            color: colors.grey4,
         },
         ":focus": {},
      },
      invalid: {
         color: colors.red,
      },
   };

   const UpdateCard = (cardToken: string) => {
      setLoading(true);
      apiService.post(
         API_URLS.UPDATECARD,
         {
            cardToken,
         },
         (response) => {
            toast.success(successMessages.STRIPE_UPDATE);
            getinfo();
            close();
         },
         () => {
            setLoading(false);
         }
      );
   };

   const isFocused = (field) => field === focused;

   return (
      <Container>
         <Form onSubmit={handleSubmit}>
            <Row>
               <ElementContainer focused={isFocused(ElementsEnum.CardNumber)}>
                  <IconContainer>
                     <Icon
                        icon={Icons.CreditCardFront}
                        size={14}
                        active
                        activeColor={colors.grey2}
                     />
                  </IconContainer>
                  <CardNumberElement
                     className="Element"
                     options={{ style, placeholder: "Card Number" }}
                     onFocus={() => setFocus(ElementsEnum.CardNumber)}
                     onBlur={() => setFocus(null)}
                  />
               </ElementContainer>
            </Row>
            <Row>
               <ElementContainer focused={isFocused(ElementsEnum.CVC)}>
                  <IconContainer>
                     <Icon
                        icon={Icons.CreditCardBack}
                        size={14}
                        active
                        activeColor={colors.grey2}
                     />
                  </IconContainer>
                  <CardCvcElement
                     className="Element"
                     options={{ style, placeholder: "CVC" }}
                     onFocus={() => setFocus(ElementsEnum.CVC)}
                     onBlur={() => setFocus(null)}
                  />
               </ElementContainer>
               <Spacer />
               <ElementContainer focused={isFocused(ElementsEnum.ExpDate)}>
                  <IconContainer>
                     <Icon
                        icon={Icons.calendar}
                        size={14}
                        active
                        activeColor={colors.grey2}
                     />
                  </IconContainer>
                  <CardExpiryElement
                     className="Element"
                     options={{ style, placeholder: "Exp. Date" }}
                     onFocus={() => setFocus(ElementsEnum.ExpDate)}
                     onBlur={() => setFocus(null)}
                  />
               </ElementContainer>
            </Row>
            <ButtonContainer>
               <Button
                  margin="20px 0px 0px 0px"
                  text="Confirm"
                  width="100%"
                  type="submit"
                  loading={loading}
                  disabled={loading}
               />

               <Button
                  margin="20px 0px 0px 0px"
                  text="Cancel"
                  width="100%"
                  onClick={() => close()}
               />
            </ButtonContainer>
         </Form>

      </Container>
   );
};
export default UpdateCardInfo;
