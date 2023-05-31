import BookDetails from "layouts/bookDetails";
import Reader from "layouts/reader";

const otherRoutes = [

  {
    type: "collapse",
    name: "Reader",
    key: "reader",
    route: "/reader/:file",
    component: < Reader/>,
    noCollapse: true,
  },

];

export default otherRoutes;
