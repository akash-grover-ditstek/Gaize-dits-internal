import toast from "react-hot-toast";
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from "../components/elements/button/Button";
import { API_URLS } from '../config/api.config';
import { successMessages } from '../config/messages.config';
import { apiService } from '../services';
import colors from "../util/Colors";

const Container = styled.div`
  padding: 20px 15px;
`;

const Text = styled.div`
  font-size:14px;
  color: ${colors.grey3};
`;
const ButtonContainer = styled.div`
   margin-top: 20px;
   display: flex;
   justify-content: flex-end;
   & Button:first-child{
    margin-right:10px;
   }
`;

export default function DeactivateAccount({ close }) {
    const [loading, setLoading] = useState(false);

    const cancelSubscription = () => {
        setLoading(true);
        apiService.get(
            API_URLS.CANCELSUBSCRIPTION,
            (response) => {
                if (response.success) {
                    toast.success(successMessages.CANCEL_SUBSCRIPTION);
                }
                close();
            },
            () => {
                setLoading(false);
            }
        );
    };
    return (
        <Container>
            <Text>
                Are you sure
                you want to cancel your Gaize account? Your access to your
                collected videos will be immediately terminated and you will be
                immediately locked out of your account.
            </Text>
            <ButtonContainer>
                <Button
                    margin="30px 0px 0px 0px"
                    text="Yes"
                    width="100%"
                    loading={loading}
                    disabled={loading}
                    onClick={cancelSubscription}
                />
                <Button
                    margin="20px 0px 0px 0px"
                    text="No"
                    width="100%"
                    onClick={() => close()}
                />
            </ButtonContainer>
        </Container>
    );
}
