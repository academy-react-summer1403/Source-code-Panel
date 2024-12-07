import {
  Mail, Home, Airplay, Circle, MessageCircle, List, User
} from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "CourseList",
    title: "دوره ها",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "CourseList",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/CourseList",
      },
      {
        id: "CourseList",
        title: "جزیات دوره",
        icon: <Circle size={12} />,
        navLink: "/CoursePreview/:id",
      },
      {
        id: "CourseList",
        title: "ویرایش دوره",
        icon: <Circle size={12} />,
        navLink: "/CourseEdit",
      },
      {
        id: "CourseList",
        title: "اضافه کردن دوره",
        icon: <Circle size={12} />,
        navLink: "/CourseAdd",
      },
    ],
  },
  {
    id: "UserList",
    title: "کاربر",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "UserList",
        title: "لیست کاربرها",
        icon: <Circle size={12} />,
        navLink: "/UserList",
      },
      {
        id: "UserList",
        title: "اطلاعات کاربر",
        icon: <Circle size={12} />,
        navLink: "/UserPre",
      },
    ],
  },
  {
    id: "Reserv",
    title: "رزرو کننده ها",
    icon: <User size={20} />,
    navLink: "/Reserv",
  },
  {
    id: "Coment",
    title: "کامنت ها",
    icon: <MessageCircle size={20} />,
    navLink: "/Coment",
  },

  {
    id: 'blog',
    title: 'اخبار',
    icon: <Circle size={12} />,
    children: [
      {
        id: 'blogList',
        title: 'لیست اخبار',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/list'
      },
      {
        id: 'blogDetail',
        title: 'جزئیات خبر',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/detail'
      },
      {
        id: 'blogEdit',
        title: 'ویرایش خبر',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/edit'
      },
      {
        id: 'blogCreate',
        title: 'ساخت خبر',
        permissions: ['admin', 'editor'],
        navLink: '/pages/blog/create'
      }
    ]
  },

];
