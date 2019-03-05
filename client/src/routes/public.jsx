// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    show: true,
    icon: Dashboard
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    show: true,
    icon: Person
  },
  {
    path: "/table",
    sidebarName: "Table List",
    navbarName: "Table List",
    show: true,
    icon: "content_paste"
  },
  {
    path: "/typography",
    sidebarName: "Typography",
    navbarName: "Typography",
    show: true,
    icon: LibraryBooks
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    show: true,
    icon: BubbleChart
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    show: true,
    icon: LocationOn
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    show: true,
    icon: Notifications
  },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    show: true,
    icon: Unarchive
  }
];

export default dashboardRoutes;
