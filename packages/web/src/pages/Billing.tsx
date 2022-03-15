import { useEffect, useState } from "react";
import Breadcum from "../components/Breadcum";
import Loader from "../components/elements/Loader";
import Colors from "../util/Colors";
import styled from "styled-components";
import Icon, { Icons } from "../components/elements/Icon";
import LoaderContainer from "../components/elements/LoaderContainer";
import Button from "../components/elements/button/Button";
import BaseModal, { ModalList } from "../modals/BaseModal";
import { TableScroll } from "../components/elements/Table";
import { TableContainer } from "../components/elements/Table";
import { TableItem } from "../components/elements/Table";
import { HeaderText } from "../components/elements/Table";
import { TableData } from "../components/elements/Table";
import { TableBody } from "../components/elements/Table";
import { TableDataItem } from "../components/elements/Table";
import { apiService } from "../services/api.service";
import { API_URLS } from "../config/api.config";
import * as Price from "../util/Price";

import moment from "moment";

const StyledIcon = styled(Icon)``;
const MainDiv = styled.div`
   display: flex;
   width: 100%;
   flex-direction: column;
   align-items: flex-start;
   justify-content: flex-start;
   margin: auto;
   box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
   background:${Colors.white};
   @media screen and (max-width: 991px) {
      overflow: auto;
   }
`;
const Status = styled.span`
   display: inline-block;
   padding: 0.5em 0.85em;
   font-size: .85rem;
   font-weight: 600;
   line-height: 1;
   text-align: center;
   white-space: nowrap;
   vertical-align: baseline;
   border-radius: 0.475rem;
   &.success{
      color: ${Colors.green};
      background-color: ${Colors.lightGreen};
   }
   &.failed{
      color: ${Colors.red};
      background-color: ${Colors.lightRed};
   }
`;

const CardDetails = styled.div`
background: ${Colors.white};
padding: 15px;
border-radius:5px;
border: 1px solid ${Colors};
position:relative;
@media screen and (max-width:576px){
padding:0px;
}
`;
const CardItem = styled.div`
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid ${Colors.borderGrey};
   padding: 12px;
   &:last-child{
      border-bottom:0px solid ${Colors.borderGrey};  
   }
`
   ;
const Title = styled.div`
font-weight: bold;
font-size: 16px;
margin: 0 0 6px 0;
` ;
const Value = styled.div`
font-size: 14px;
font-weight: 500;
`;

const CardButtons = styled.div`
margin: 0 0 30px 0;
display: flex;
justify-content: flex-end;
& Button:first-child{
   margin-right:10px;   
}
@media screen and (max-width:576px){
display:block;
}
`;

export default function Billing() {
   const [updateCardIsVisible, setUpdateCardIsVisible] = useState(false);
   const [deactivateAccountIsVisible, setDeactivateAccountIsVisible] = useState(false);
   const [cardInfo, setCardInfo]: any = useState([]);
   const [subscriptionInfo, setSubscriptionInfo]: any = useState([]);
   const [paymentList, setPaymentList]: any = useState([]);
   const [isCardInfoLoading, setIsCardInfoLoading] = useState(false);
   const [isPaymentInfoLoading, setIsPaymentInfoLoading] = useState(false);


   useEffect(() => {
      getCardInfo();
      getPayment();
   }, []) // eslint-disable-line


   const getCardInfo = () => {
      setIsCardInfoLoading(true);
      apiService.get(
         API_URLS.GETCARDINFO,
         (response) => {
            if (Array.isArray(response.data.cardInfo)) {
               setCardInfo(response.data.cardInfo[0])
            }
            if (response?.data?.subscription) {

               setSubscriptionInfo(response.data.subscription)
            }


         }, () => {
            setIsCardInfoLoading(false);
         }
      );

   }
   const getPayment = () => {
      setIsPaymentInfoLoading(true);
      apiService.get(
         API_URLS.GETPAYMENTS,
         (response) => {
            setPaymentList(response.data.payments)
         }, () => {
            setIsPaymentInfoLoading(false);
         }
      );

   }
   return (
      <>
         <BaseModal
            open={updateCardIsVisible}
            modalType={ModalList.UpdateCardInfo}
            onClose={setUpdateCardIsVisible}
            getinfo={getCardInfo}
         />
         <BaseModal
            open={deactivateAccountIsVisible}
            modalType={ModalList.DeactivateAccount}
            onClose={setDeactivateAccountIsVisible}
         />

         <Breadcum text="Billing" title=""></Breadcum>
         <CardDetails>
            {isCardInfoLoading && (
               <LoaderContainer>
                  <Loader />
               </LoaderContainer>
            )}
            <CardItem>
               <Title>Card Number</Title>
               {cardInfo.cardNumber && <Value>************{cardInfo.cardNumber}</Value>}
            </CardItem>
            <CardItem>
               <Title>Expiry Date</Title>
               {cardInfo.expiryYear && <Value>{cardInfo.expiryMonth}/{cardInfo.expiryYear}</Value>}
            </CardItem>
            <CardItem>
               <Title>Subscription Expiry Date</Title>
               {subscriptionInfo.cycleEndAt && <Value>{moment.unix(subscriptionInfo.cycleEndAt).format("MM/DD/YYYY")}</Value>}
            </CardItem>
         </CardDetails>
         <CardButtons>
            <Button
               margin="0px 10px 0px 0px"
               text="Update Card Info"
               type="button"
               width="100%"
               onClick={() => setUpdateCardIsVisible(true)}
            />
            <Button
               text="Cancel Subscription"
               type="button"
               onClick={() => setDeactivateAccountIsVisible(true)}
               width="100%"
            />
         </CardButtons>
         <MainDiv>
            <TableScroll>
               <TableContainer>
                  {isPaymentInfoLoading && (
                     <LoaderContainer>
                        <Loader />
                     </LoaderContainer>
                  )}
                  <TableItem>
                     {/* <HeaderText>Subscription Type</HeaderText> */}
                     <HeaderText>Payment Date</HeaderText>
                     <HeaderText>Amount</HeaderText>
                     <HeaderText>Status</HeaderText>
                  </TableItem>
                  <TableBody>
                     {paymentList.length < 1 && <TableData><TableDataItem colSpan={4} className="noRecord">Record not found</TableDataItem></TableData>}

                     {paymentList.map((pay, i) => {
                        return (
                           <TableData key={i}>
                              <TableDataItem>{moment.unix(pay.paymentDate).format("MM/DD/YYYY")}</TableDataItem>
                              <TableDataItem>{`$${Price.output(pay.total, true)}`}</TableDataItem>
                              {pay.status === true ? <TableDataItem><Status className="success">Success</Status></TableDataItem> :
                                 <TableDataItem><Status className="failed">Failed</Status>
                                 </TableDataItem>}
                           </TableData>
                        )
                     })}
                  </TableBody>
               </TableContainer>
            </TableScroll>
         </MainDiv>
      </>
   );
};
