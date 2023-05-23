/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav.
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

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
