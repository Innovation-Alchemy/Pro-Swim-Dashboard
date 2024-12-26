import homeIcon from "../../public/home-icon.png";
import usersIcon from "../../public/users-icon.png";
// import learnToSwimIcon from "../../public/learn-to-swim-icon.png";
import productsIcon from "../../public/product-icon.png";
// import classIcon from "../../public/class-icon.png";
// import albumIcon from "../../public/album-icon.png";
import settingsIcon from "../../public/settings-icon.png";

import activeHomeIcon from "../../public/active-home-icon.png";
import activeUsersIcon from "../../public/active-users-icon.png";
// import activeLearnToSwimIcon from "../../public/active-learn-to-swim-icon.png";
import activeProductsIcon from "../../public/active-product-icon.png";
// import activeClassIcon from "../../public/active-class-icon.png";
// import activeAlbumIcon from "../../public/active-album-icon.png";
import activeSettingsIcon from "../../public/active-settings-icon.png";
import { OrderModel } from "../models/order";
import { UserModel } from "../models/user";
import { UserEmailModel } from "../models/user_email";
import { ScheduleCall } from "../models/schedule-call";
export const navLinks = [
  {
    title: "Home",
    path: "/",
    icon: homeIcon,
    activeIcon: activeHomeIcon,
  },
  {
    title: "Users",
    path: "/users",
    icon: usersIcon,
    activeIcon: activeUsersIcon,
  },
  // {
  //   title: "Learn To Swim",
  //   path: "/learn-to-swim",
  //   icon: learnToSwimIcon,
  //   activeIcon: activeLearnToSwimIcon,
  // },
  {
    title: "Product Management",
    path: "/products",
    icon: productsIcon,
    activeIcon: activeProductsIcon,
  },
  // {
  //   title: "Class Management",
  //   path: "/class",
  //   icon: classIcon,
  //   activeIcon: activeClassIcon,
  // },
  // {
  //   title: "Album Management",
  //   path: "/albums",
  //   icon: albumIcon,
  //   activeIcon: activeAlbumIcon,
  // },
  {
    title: "Settings",
    path: "/settings",
    icon: settingsIcon,
    activeIcon: activeSettingsIcon,
  },
];

export const userHeaders = [
  { label: "Email Address", data: (row: UserModel) => row.email },
  { label: "Role", data: (row: UserModel) => row.role },
];
export const userOrderHeaders = [
  {
    label: "Product",
    data: (row: OrderModel) => row.products[0].product_information.title,
  },
  {
    label: "Quantity",
    data: (row: OrderModel) => row.products[0].product_quantity,
  },
  { label: "Address", data: (row: OrderModel) => row.address },
  { label: "Name", data: (row: OrderModel) => row.user_id },
];

export const orderHeaders = [
  {
    label: "Product",
    data: (row: OrderModel) => row.products[0].product_information.title,
  },
  {
    label: "Quantity",
    data: (row: OrderModel) => row.products[0].product_quantity,
  },
  {
    label: "Address",
    data: (row: OrderModel) => row.address,
  },
  {
    label: "Name",
    data: (row: OrderModel) => row.user_id,
  },
  {
    label: "Total Price",
    data: (row: OrderModel) => row.total_price,
  },
];

export const callsHeaders = [
  { label: "Name", data: (row: ScheduleCall) => row.name },
  { label: "Email", data: (row: ScheduleCall) => row.email },
  { label: "Date", data: (row: ScheduleCall) => row.date },
  { label: "Time", data: (row: ScheduleCall) => row.time },
];

export const emailHeaders = [
  { label: "Subject", data: (row: UserEmailModel) => row.subject },
  { label: "Email", data: (row: UserEmailModel) => row.email },
  { label: "Category", data: (row: UserEmailModel) => row.category },
];

export const userEmailHeaders = [
  { label: "Subject", data: (row: UserEmailModel) => row.subject },
  { label: "Name", data: (row: UserEmailModel) => row.name },
  { label: "Email Address", data: (row: UserEmailModel) => row.email },
  { label: "Category", data: (row: UserEmailModel) => row.category },
];
