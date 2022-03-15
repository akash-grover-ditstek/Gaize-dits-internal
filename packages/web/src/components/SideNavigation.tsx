import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Icon from "./elements/icons/Icon";
import { IconEnum as Icons } from "./elements/icons/Icons";
import Colors from "../util/Colors";
import AccessLevels from "../util/AccessLevels";
import { UserContext } from "./context/UserContext";
import { media } from "../util/MediaQuery";
import { AppContext } from "./context/AppContext";
import { Auth } from "aws-amplify";
import { Navigate, useNavigate } from "react-router-dom";
import { localStorageService } from "../services";
import routePaths from "../config/routepaths.config";
const favicon = require("../assets/images/favicon.png");

// import BaseModal, { ModalList } from './modals/BaseModal';
// import { AppContext } from '../context/AppContext';

const SideNavContainer = styled.nav<{ display: string }>`
   overflow: auto;
   width: 80px;
   min-width: 80px;
   height: 100%;
   background: ${Colors.white};
   flex-direction: column;
   box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
   align-items: center;
   top: 0;
   left: 0;
   transition: 0.5s;
   z-index: ${(props) => ((props.display as string) ? "900" : "1")};
   position: fixed;
   ${media.desktop`
    display: flex;
  `};

   @media screen and (max-width: 991px) {
      width: 185px;
      min-width: 185px;
      top:75px;
      left: ${(props) => (props.display === "1" ? "0" : "-100%")};
   }
`;

const SideNavInner = styled.div`
   display: flex;
   flex-direction: column;
   position: relative;
   height: inherit;
   width: 100%;
`;
const NavItem = styled.div<{ active?: boolean }>`
   padding: 20px 0;
   color: ${(props) => (props.active ? Colors.white : Colors.grey3)};
   background:${(props) => (props.active ? Colors.blue : Colors.white)};
   cursor: pointer;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   @media screen and (max-width: 991px) {
      // margin-bottom: 25px;
      position: relative;
      align-items: center;
      justify-content: unset;
      display: flex;
      padding: 12px 8px;
      // color: ${(props) => (props.active ? Colors.white : Colors.grey3)};
   }
   svg {
      font-size:25px;
      @media screen and (max-width: 991px) {
         font-size:18px;
         min-width:30px;
      }
      @media screen and (max-width: 767px) {
         min-width: 40px;
      }
   }
`;

const MenuText = styled.span<{ bottom?: true }>`
   position: absolute;
   left: ${(props) => (props.bottom ? "50%" : "24%")};
   padding: 0 0 0 30px;
   font-size: 14px;
   display: none;
   @media screen and (max-width: 991px) {
      display: block;
      position:relative;
      left:auto;
      padding: 0 0 0 8px;
   }
`;

const LogoImg = styled.img`
   width: 50px;
`;

const LogoSquare = styled.div`
   max-width: 100%;
   margin: 13px auto 13px;
   background: ${Colors.grey6};
   display: flex;
   align-items: center;
   justify-content: center;
   @media screen and (max-width: 991px) {
      margin: 21px auto;
      display:none;
   }

`;

const BottomButtons = styled.div`
   position: fixed;
   bottom: 0;
   left: 0;
   display: flex;
   width: 80px;
   justify-content: center;
   background-color: ${Colors.white};
   @media screen and (max-width: 991px) {
      justify-content: flex-start;
      position: relative;
      padding-left: unset;
      width:100%;
   }
`;

function GetSideNavButtons({ push }: any, app: any, closeNavBar: any) {
   const { campaignId } = useParams();
   const navigate = useNavigate();
   const navigateCloseNav = (path: any) => {
      closeNavBar();
      navigate(path);
   };

   return [
      {
         icon: Icons.Home,
         onClick: () => navigateCloseNav(routePaths.HOME),
         active: [routePaths.HOME],
         text: "Home",
         accessLevels: [AccessLevels.SuperAdmin, AccessLevels.Admin],
      },
      {
         icon: Icons.Video,
         onClick: () => navigateCloseNav(routePaths.VIDEOS),
         active: [routePaths.VIDEOS],
         text: "Videos",
         accessLevels: [AccessLevels.SuperAdmin, AccessLevels.Admin],
      },
      {
         icon: Icons.DollarSign,
         onClick: () => navigateCloseNav(routePaths.BILLING),
         active: [routePaths.BILLING],
         text: "Billing",
         accessLevels: [AccessLevels.SuperAdmin, AccessLevels.Admin],
      },
   ];
}

function getBottomButtons(setLogoutModalIsVisible: any, closeNavBar: any) {
   return [
      {
         icon: Icons.SignOut,
         onClick: () => {
            closeNavBar("/login");
            setLogoutModalIsVisible(true);
            localStorage.clear();
         },
         active: [],
         text: "Logout",
         accessLevels: [
            AccessLevels.SuperAdmin,
            AccessLevels.Admin,
            AccessLevels.Server,
         ],
      },
   ];
}

function useOnClickOutside(ref: any, handler: any) {
   useEffect(
      () => {
         const listener = (event: any) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
               return;
            }
            handler(event);
         };
         document.addEventListener("mousedown", listener);
         document.addEventListener("touchstart", listener);
         return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
         };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
   );
}

function SideNavigation() {
   const ref = useRef();
   const navigate = useNavigate();
   const { app, setApp } = useContext(AppContext);
   // const history = useHistory();
   const [logoutModalIsVisible, setLogoutModalIsVisible] = useState(false);
   //const { user } = useContext(UserContext);
   const accessLevel = "Admin";

   const closeNavBar = () => {
      setApp({ ...app, showSideNav: false });
   };

   async function signOut() {
      try {
         await Auth.signOut();
         navigate(routePaths.LOGIN);
      } catch (error) {
         return
      }
   }

   useOnClickOutside(ref, () => {
      closeNavBar();
   });

   useEffect(() => {
      setApp((app: any) => ({ ...app, showSideNav: false }));
   }, [setApp]);

   return (
      <>
         {/* <BaseModal
        open={logoutModalIsVisible}
        modalType={ModalList.LogoutModal}
        onClose={setLogoutModalIsVisible}
      /> */}
         <SideNavContainer
            display={app?.showSideNav ? "1" : "0"}
            id="leftNavBar"
         // ref={ref}
         >
            <SideNavInner>
               <LogoSquare>
                  <LogoImg
                     src={favicon}
                     onClick={() => navigate(routePaths.HOME)}
                  />
               </LogoSquare>
               {GetSideNavButtons(history, null, closeNavBar).map((b, i) => {
                  const pathname = window.location.pathname;

                  return (
                     <React.Fragment key={i}>
                        {b.accessLevels.includes(accessLevel) && (
                           <NavItem
                              key={i}
                              data-tip={b.text}
                              onClick={() => b.onClick()}
                              active={
                                 b.active.includes(pathname) ? true : false
                              }
                           >
                              <Icon
                                 active={
                                    b.active.includes(pathname) ? true : false
                                 }
                                 icon={b.icon}
                              />
                              <MenuText>{b.text}</MenuText>
                           </NavItem>
                        )}
                     </React.Fragment>
                  );
               })}
               <BottomButtons>
                  {getBottomButtons(setLogoutModalIsVisible, signOut).map(
                     (b, i) => {
                        const pathname = window.location.pathname;
                        return (
                           <React.Fragment key={i}>
                              {b.accessLevels.includes(accessLevel) && (
                                 <NavItem onClick={b.onClick} data-tip={b.text}>
                                    <Icon icon={b.icon} />
                                    <MenuText bottom={true}>{b.text}</MenuText>
                                 </NavItem>
                              )}
                           </React.Fragment>
                        );
                     }
                  )}
               </BottomButtons>
            </SideNavInner>
            <ReactTooltip place="right" type="dark" effect="solid" />
         </SideNavContainer>
      </>
   );
}

export default SideNavigation;
