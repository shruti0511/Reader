// Soft UI Dashboard React layouts
import Tables from "layouts/tables";

// Soft UI Dashboard React icons
import Office from "examples/Icons/Office";
import Category from "layouts/category";

const adminRoutes = [
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Category",
    key: "category",
    route: "/category",
    icon: <Office size="12px" />,
    component: <Category />,
    noCollapse: true,
  },

];

export default adminRoutes;
