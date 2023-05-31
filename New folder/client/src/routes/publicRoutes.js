// Soft UI Dashboard React layouts
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import EmailConfirmation from "layouts/authentication/email-confirmation";


// Soft UI Dashboard React icons
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import ForgotPassword from "layouts/authentication/forgot-password";
import ResetPassword from "layouts/authentication/reset-password";

const publicRoutes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "confirm email",
    key: "confirm-email",
    route: "/authentication/confirm/:confirmationCode",
    icon: <SpaceShip size="12px" />,
    component: < EmailConfirmation/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Forgot Password",
    key: "forgot-password",
    route: "/authentication/forgotPassword",
    icon: <SpaceShip size="12px" />,
    component: < ForgotPassword/>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "reset Password",
    key: "reset-password",
    route: "/authentication/reset/:token",
    icon: <SpaceShip size="12px" />,
    component: < ResetPassword/>,
    noCollapse: true,
  },
];

export default publicRoutes;
