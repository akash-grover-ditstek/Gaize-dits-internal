import { lazy, Suspense, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardRoute from "./DashboardRoute";
import AuthRoute from "./AuthRoute";
import Button from "../components/elements/button/Button";
import { Amplify, Auth } from "aws-amplify";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../components/context/AppContext";

import Loader from "../components/elements/Loader";
import LoaderContainer from "../components/elements/LoaderContainer";
import routePaths from "../config/routepaths.config";
import { localStorageService } from "../services";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ConfirmEmail = lazy(() => import("../pages/ConfirmEmail"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Home = lazy(() => import("../pages/Home"));
const EnterPayment: any = lazy(() => import("../pages/StripePayment"));
const Videos = lazy(() => import("../pages/Videos"));
const Billing = lazy(() => import("../pages/Billing"));

const About = () => {
   return <h1>About</h1>;
};

const Loading = (
   <LoaderContainer>
      <Loader />
   </LoaderContainer>
);

export const BaseRoutes = () => {
   const [app, setApp] = useState(null);
   const appValue = useMemo(() => ({ app, setApp }), [app, setApp]);
   return (
      <AppContext.Provider value={appValue}>
         <Suspense fallback={Loading}>
            <Routes>
               <Route
                  path="/"
                  element={
                     <DashboardRoute>
                        <Home />
                     </DashboardRoute>
                  }
               />
               <Route
                  path={routePaths.LOGIN}
                  element={
                     <AuthRoute>
                        <Login />
                     </AuthRoute>
                  }
               />
               <Route
                  path={routePaths.REGISTER}
                  element={
                     <AuthRoute>
                        <Register />
                     </AuthRoute>
                  }
               />
               <Route
                  path={routePaths.RESET_PASSWORD}
                  element={
                     <AuthRoute>
                        <ResetPassword />
                     </AuthRoute>
                  }
               />
               <Route
                  path={routePaths.FORGOT_PASSWORD}
                  element={
                     <AuthRoute>
                        <ForgotPassword />
                     </AuthRoute>
                  }
               />
               <Route
                  path={routePaths.CONFIRM_EMAIL}
                  element={
                     <AuthRoute>
                        <ConfirmEmail />
                     </AuthRoute>
                  }
               />

               <Route
                  path={routePaths.STRIPE}
                  element={
                     <AuthRoute>
                        <EnterPayment />
                     </AuthRoute>
                  }
               />

               <Route
                  path={routePaths.ABOUT}
                  element={
                     <DashboardRoute>
                        <About />
                     </DashboardRoute>
                  }
               />
               <Route
                  path={routePaths.VIDEOS}
                  element={
                     <DashboardRoute>
                        <Videos />
                     </DashboardRoute>
                  }
               />
               <Route
                  path={routePaths.BILLING}
                  element={
                     <DashboardRoute>
                        <Billing />
                     </DashboardRoute>
                  }
               />
               <Route
                  path={routePaths.HOME}
                  element={
                     <DashboardRoute>
                        <Home />
                     </DashboardRoute>
                  }
               />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </Suspense>
      </AppContext.Provider>
   );
};

const NotFound = () => {
   return <h1>Not Found</h1>;
};

export default BaseRoutes;
