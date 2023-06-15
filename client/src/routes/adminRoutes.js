// Soft UI Dashboard React icons
import Office from "examples/Icons/Office";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CategoryIcon from '@mui/icons-material/Category';
import Books from "layouts/books";
import Category from "layouts/category";
import Other from "layouts/Others";

const adminRoutes = [
  {
    type: "collapse",
    name: "Books",
    key: "books",
    route: "/books",
    icon: <LibraryBooksIcon size="12px" />,
    component: <Books />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "others",
    key: "others",
    route: "/others",
    icon: <Office size="12px" />,
    component: <Other />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Category",
    key: "category",
    route: "/category",
    icon: <CategoryIcon size="12px" />,
    component: <Category />,
    noCollapse: true,
  },

];

export default adminRoutes;
