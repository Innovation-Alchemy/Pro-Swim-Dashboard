import axios from "axios";
import CustomTable from "../components/CustomTable";
import Navbar from "../components/Navbar";
import {
  // callsHeaders,
  emailHeaders,
  homeOrderHeaders,
  userHeaders,
} from "../data";
import { useEffect, useState } from "react";
import { fromJsonToOrder, OrderModel } from "../models/order";
import { UserModel } from "../models/user";
import { useNavigate } from "react-router-dom";
// import { ScheduleCall } from "../models/schedule-call";
import { fromJsonToUserEmail, UserEmailModel } from "../models/user_email";
const Home = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  // const [calls, setCalls] = useState<ScheduleCall[]>([]);
  const [emails, setEmails] = useState<UserEmailModel[]>([]);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/orders"
      );
      const ordersData: OrderModel[] = response.data["data"].map(
        (data: unknown) => fromJsonToOrder(data)
      );

      setOrders(ordersData);
    } catch {
      return;
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "users"
      );
      const users = response.data["data"].map(
        (user: { id: number; name: string ;email: string; phone: string; role: string }) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        })
      );
      setUsers(users);
    } catch {
      return;
    }
  };

  // const fetchScheduleCalls = async () => {
  //   try {
  //     const response = await axios.get(
  //       process.env.REACT_APP_BASE_URL + "schedule-call"
  //     );

  //     const calls = response.data["data"].map((call: any) => {
  //       // Assuming the date field is in ISO 8601 format
  //       const [date, time] = call.date.split("T"); // Splitting the date and time
  //       return {
  //         id: call.id,
  //         name: call.name,
  //         email: call.email,
  //         date: date, // This will give the date in YYYY-MM-DD format
  //         time: time.slice(0, 5), // Extracting only the HH:mm part from the time
  //       };
  //     });

  //     setCalls(calls);
  //   } catch (error) {
  //     return;
  //   }
  // };

  const fetchEmails = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "feedback-and-contactus"
      );
      const emailsData: UserEmailModel[] = response.data["data"].map(
        (data: unknown) => fromJsonToUserEmail(data)
      );

      setEmails(emailsData);
    } catch {
      return;
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    // fetchScheduleCalls();
    fetchEmails();
  }, []);
  return (
    <div className="w-full md:ml-[300px]">
      <Navbar links={[{ title: "Summary", path: "/" }]} />
      <div className="flex flex-col gap-6 my-6 mx-6">
        <div className="w-full">
          <CustomTable
            title="Users"
            headers={userHeaders}
            data={users}
            limtedBy={5}
            onLimitedClicked={() => {
              navigate("/users");
            }}
          />
        </div>
        <div className="w-full">
          <CustomTable
            title="Orders"
            headers={homeOrderHeaders(users)}
            data={orders}
            limtedBy={5}
            onLimitedClicked={() => {
              navigate("/orders");
            }}
          />
        </div>
      </div>
      <div className="flex xl:flex-row flex-col gap-3 my-3 mx-3">
        {/* <div className="xl:w-[60%]">
          <CustomTable
            title="Scheduled Calls"
            headers={callsHeaders}
            data={calls}
            limtedBy={5}
          />
        </div> */}
        {/* <div className="xl:w-[40%]">
          <CustomTable
            title="Emails"
            headers={emailHeaders}
            data={emails}
            limtedBy={5}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
