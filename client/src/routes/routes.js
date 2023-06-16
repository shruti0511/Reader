// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import HomePage from "layouts/home";
import Reader from "layouts/reader";
import MyLibrary from "layouts/library";
import BookDetails from "layouts/bookDetails";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <Shop size="12px" />,
    component: <HomePage />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "My Library",
    key: "library",
    route: "/library",
    icon: <CreditCard size="12px" />,
    component: <MyLibrary />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "title",
    name: "Book Details",
    key: "book-details",
    route: "/bookDetail/:id",
    component: < BookDetails/>,
    noCollapse: true,
  },
];

export default routes;
