import homeIcon from "../../public/home-icon.png";
import usersIcon from "../../public/users-icon.png";
// import learnToSwimIcon from "../../public/learn-to-swim-icon.png";
import productsIcon from "../../public/product-icon.png";
// import classIcon from "../../public/class-icon.png";
// import albumIcon from "../../public/album-icon.png";
// import settingsIcon from "../../public/settings-icon.png";

import activeHomeIcon from "../../public/active-home-icon.png";
import activeUsersIcon from "../../public/active-users-icon.png";
// import activeLearnToSwimIcon from "../../public/active-learn-to-swim-icon.png";
import activeProductsIcon from "../../public/active-product-icon.png";
// import activeClassIcon from "../../public/active-class-icon.png";
// import activeAlbumIcon from "../../public/active-album-icon.png";
// import activeSettingsIcon from "../../public/active-settings-icon.png";
import { OrderModel } from "../models/order";
import { UserModel } from "../models/user";
import { UserEmailModel } from "../models/user_email";
import { ScheduleCall } from "../models/schedule-call";
import { format } from 'date-fns';
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
  // {
  //   title: "Settings",
  //   path: "/settings",
  //   icon: settingsIcon,
  //   activeIcon: activeSettingsIcon,
  // },
];
// Function to fetch the user's name by email
const getUserNameByEmail = (id: string, users: UserModel[]) => {
  const user = users.find((user) => user.id === Number(id));
  return user?.name ? user.name : "Unknown User";
};
// Function to fetch the user's name by email
const getUserPhoneNumber = (id: string, users: UserModel[]) => {
  const user = users.find((user) => user.id === Number(id));
  return user?.phone ? user.phone : "Unknown Number";
};
export const userHeaders = [
  { label: "Name", data: (row: UserModel) => row.name },
  { label: "Email Address", data: (row: UserModel) => row.email },
  { label: "Phone Number", data: (row: UserModel) => row.phone },
  { label: "Role", data: (row: UserModel) => row.role },
];
export const userOrderHeaders = [
    {label: "Products",
    data: (row: OrderModel) =>
      row.products
        .map(
          (product) =>
            `${product.product_information.title} : ${product.product_color} x ${product.product_quantity}`
        )
        .join(", "),
  },
  { label: "Address", data: (row: OrderModel) => row.address },
  { label: "Total Price", data: (row: OrderModel) => row.total_price },
  { label: "Type", data: (row: OrderModel) => row.type },
  { label: "Date", data: (row: OrderModel) => format(new Date(row.created_at), "MM/dd/yyyy") },
]
export const homeOrderHeaders = (users: UserModel[]) => [
  {
    label: "Products",
    data: (row: OrderModel) =>
      row.products.length > 1
        ? `x${row.products.length}`
        : row.products
            .map(
              (product) =>
                `${product.product_information.title} : ${product.product_color} x ${product.product_quantity}`
            )
            .join(", "),
  },
  { label: "Address", data: (row: OrderModel) => row.address },
  { label: "Name", data: (row: OrderModel) =>getUserNameByEmail(row.user_id, users) },
  { label: "Phone Number", data: (row: OrderModel) => getUserPhoneNumber(row.user_id, users) },
  { label: "Total Price", data: (row: OrderModel) => row.total_price },
  { label: "Type", data: (row: OrderModel) => row.type },
  { label: "Date", data: (row: OrderModel) => format(new Date(row.created_at), "MM/dd/yyyy") },
];

export const orderHeaders = (users: UserModel[]) => [
  {
    label: "Products",
    data: (row: OrderModel) =>
      row.products
        .map(
          (product) =>
            `${product.product_information.title} : ${product.product_color} x ${product.product_quantity}`
        )
        .join(", "),
  },
  { label: "Address", data: (row: OrderModel) => row.address },
  { label: "Name", data: (row: OrderModel) => getUserNameByEmail(row.user_id, users) },
  {label: "Phone Number", data: (row: OrderModel) => getUserPhoneNumber(row.user_id, users) },
  { label: "Total Price", data: (row: OrderModel) => row.total_price },
  { label: "Type", data: (row: OrderModel) => row.type },
  { label: "Date", data: (row: OrderModel) => format(new Date(row.created_at), "MM/dd/yyyy") },
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
