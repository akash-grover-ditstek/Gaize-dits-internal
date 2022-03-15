import "./App.css";
import BaseRoutes from "./routes/Routes";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import { AppContext } from "./components/context/AppContext";
import { UserContext } from "./components/context/UserContext";

const stripePromise = loadStripe(
   process.env.REACT_APP_STRIPE_PUBLISH_KEY || ""
);

function App() {
   const [app, setApp] = useState({ showSideNav: true });
   const [user, setUser] = useState({});
   const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
   const appValue = useMemo(() => ({ app, setApp }), [app, setApp]);

   return (
      <Elements stripe={stripePromise}>
         <AppContext.Provider value={appValue}>
            <UserContext.Provider value={userValue as any}>
               <BaseRoutes />
            </UserContext.Provider>
         </AppContext.Provider>
      </Elements>
   );
}

export default App;
