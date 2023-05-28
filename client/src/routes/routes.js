// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
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
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <RTL />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  }
];

export default routes;
