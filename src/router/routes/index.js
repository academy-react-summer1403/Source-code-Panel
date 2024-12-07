// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";


const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";


const Reserv = lazy(() => import("../../pages/Reserv/Reserv"));
const UserList = lazy(() => import("../../pages/User/UserList/UserList"));
const UserPre = lazy(() => import("../../pages/User/UserPre/UserPre"));
const BlogList = lazy(() => import("../../pages/blog/list/index"));
const BlogCreate = lazy(() => import("../../pages/blog/create/index"));
const BlogDetails = lazy(() => import("../../pages/blog/details/index"));
const BlogEdit = lazy(() => import("../../pages/blog/edit/index"));
const AddUser = lazy(() => import("../../pages/User/AddUser/AddUser"))
const EditUser = lazy(() => import("../../pages/User/EditUser/EditUser"))
const Coment = lazy(() => import("../../pages/Comment/Coment"));
const Home = lazy(() => import("../../pages/Home"));
const CourseList = lazy(() => import("../../pages/Course/CourseList/CourseList"));
const CourseAdd = lazy(() => import("../../pages/Course/CourseAdd/CourseAdd"));
const CourseEdit = lazy(() => import("../../pages/Course/CourseEdit/CourseEdit"));
const CoursePreview = lazy(() => import("../../pages/Course/CoursePreview/CoursePreview"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/UserList",
    element: <UserList />,
  },
  {
    path: "/UserPreview/:id",
    element: <UserPre />,
  },
  {
    path: "/CourseList",
    element: <CourseList />,
  },
  {
    path: "/CourseAdd",
    element: <CourseAdd />,
  },
  {
    path: "/CoursePreview/:id",
    element: <CoursePreview />,
  },
  {
    path: '/pages/blog/list',
    element: <BlogList />
  },
  {
    path: '/pages/blog/create',
    element: <BlogCreate />
  },
  {
    path: '/pages/blog/detail/:id',
    element: <BlogDetails />
  },
  {
    path: '/pages/blog/detail',
    element: <Navigate to='/pages/blog/detail/1' />
  },
  {
    path: '/pages/blog/edit/:id',
    element: <BlogEdit />
  },
  {
    path: '/pages/blog/edit',
    element: <Navigate to='/pages/blog/edit/1' />
  },

  {
    path: "/CourseEdit",
    element: <CourseEdit />,
  },
  {
    path: "/Reserv",
    element: <Reserv />,
  },
  {
    path: "/Coment",
    element: <Coment />,
  },
  {
    path: "/AddUser",
    element: <AddUser />,
  },
  {
    path: "/EditUser",
    element: <EditUser />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
