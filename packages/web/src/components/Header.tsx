import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./context/AppContext";
import Colors from "../util/Colors";
// import BusinessPreview from "./BusinessPreview";
import Icon from "../components/elements/icons/Icon";
import { IconEnum as Icons } from "./elements/icons/Icons";
const Logo = require("../assets/images/logo.png");
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import routePaths from "../config/routepaths.config";
import { localStorageService } from "../services";

const HeaderContainer = styled.div`
   position: fixed;
   top: 0;
   padding-left: 80px;
   height: 60px;
   padding: 8px 0;
   display: flex;
   justify-content: center;
   width: 100%;
   background: ${Colors.white};
   box-shadow: 0px 4px 16px rgb(0 0 0 / 8%);
   @media screen and (max-width: 991px) {
      padding-left: 0px;
      height: 75px;
   }
`;

const LogoImage = styled.img`
   max-width: 100%;
`;

const BusinessPreviewContainer = styled.div`
   padding: 15px;
`;
const HeaderMagin = styled.div`
   margin-bottom: 35px;
`;
const UserInfo = styled.div`
   margin-left: 10px;
   & p {
      margin: 0;
      color: #000;
      font-size: 0.9rem;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      @media screen and (max-width: 480px) {
         width: 70px;
         font-size: 12px;
         line-height: 13px;
      }
      @media screen and (max-width: 991px) {
         font-size: 12px;
         line-height: 13px;
      }
   }
`;
const UserProfile = styled.div`
   display: flex;
   justify-content: center;
   top: 50%;
   transform: translateY(-50%);
   right: 0;
   position: absolute;
   z-index: 20;
   padding: 5px;
   // box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
   border-radius: 7%;
   @media screen and (max-width: 991px) {
      align-items: center;
      flex-direction: column;
   }
   & Icon {
      color: ${Colors.white};
   }
`;
const BarsContainer = styled.div`
   top: 25px;
   left: 195px;
   display: none;
   position: absolute;
   z-index: 20;
   padding: 5px;
   box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
   border-radius: 7%;
   color: #0a243d;
   height: 30px;
   background: #777;
   cursor: pointer;
   @media screen and (max-width: 991px) {
      display: block;
      left: 10px;
      top:50%;
      transform:translateY(-50%);
      box-shadow: none;
      background-color: transparent;
      svg{
       font-size:18px;
      }
   }
`;

const ProfileImage = styled.div`
   max-width: 100%;
   display: flex;
   align-items: center;
   height: 45px;
   width: 45px;
   justify-content: center;
   border-radius: 50%;
   background: ${Colors.white};
   @media screen and (max-width: 991px) {
      height: 30px;
      width: 30px;
      argin-bottom: 3px;
   }
   svg {
      @media screen and (max-width: 991px) {
         font-size: 16px !important;
      }
   }
`;

export default function Header() {
   const navigate = useNavigate();
   const { app, setApp } = useContext(AppContext);
   const user = localStorageService.getUserDetail();

   return (
      <HeaderContainer>
         <UserProfile>
            <ProfileImage>
               <Icon icon={Icons.User} inactiveColor={Colors.seaGreen} />
            </ProfileImage>
            <UserInfo>
               <p title="User Name">
                  {`${user?.user?.firstName} ${user?.user?.lastName}`}
               </p>
               <p title="Oraganozation Name">
                  {`${user?.organization?.organizationName}`}
               </p>
            </UserInfo>
         </UserProfile>
         <BarsContainer id="hamberger">
            <Icon
               icon={Icons.MenuSolid}
               inactiveColor={Colors.white}
               onClick={() =>
                  setApp((app) => ({
                     ...app,
                     showSideNav: !app.showSideNav,
                  }))
               }
            />
         </BarsContainer>
         <LogoImage
            src={Logo}
            onClick={() => navigate(routePaths.HOME)}
         ></LogoImage>
      </HeaderContainer>
   );
}
