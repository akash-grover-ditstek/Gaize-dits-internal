/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import colors from '../util/Colors';
import Icon from '../components/elements/Icon';
import { IconEnum as Icons } from '../components/elements/Icons';
import UpdateCardInfo from './UpdateCardInfoModal';
import 'reactjs-popup/dist/index.css';
import DeactivateAccount from './DeactivateAccountModal';

const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  background: 'white',
  borderRadius: '5px',
  width: '750px',
  padding: '0px',
};

const Title = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
  color: ${colors.grey1};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid ${colors.grey6};
`;

export const ModalList = Object.freeze({
  UpdateCardInfo: 'Update card details',
  DeactivateAccount: "Deactivate Account"
});

export default function BaseModal({
  open, modalType, onClose, ...rest
}): any {
  const renderModal = (modalType, close) => {
    switch (modalType) {

      case ModalList.UpdateCardInfo:
        return <UpdateCardInfo close={close} {...rest} />;
      case ModalList.DeactivateAccount:
        return <DeactivateAccount close={close} {...rest} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const HamBergerElement = document.getElementById('hamberger');

    if (HamBergerElement?.style) {
      if (open) {
        // set hamberger index to negitive
        HamBergerElement.style.zIndex = '1';
      } else {
        // set positive index
        HamBergerElement.style.zIndex = '20';
      }
    }
  }, [open, modalType]);

  return (
    <Popup
      modal
      open={open}
      closeOnDocumentClick={false}
      onClose={() => onClose(false)}
      contentStyle={modalStyle as any}
    >
      {(close) => (
        <>
          <Header>
            <Title>{modalType}</Title>
            <Icon
              icon={Icons.TimesCircleSolid}
              onClick={() => close()}
              size={15}
            />
          </Header>
          {renderModal(modalType, close)}
        </>
      )}
    </Popup>
  );
}
