import axios from "axios";
import CustomTable from "../components/CustomTable";
import { orderHeaders } from "../data";
import { useEffect, useState } from "react";
import { fromJsonToOrder, OrderModel } from "../models/order";
import { UserModel } from "../models/user";


const Orders = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/orders"
      );

      console.log(response.data);
      const orderData = response.data["data"].map((data: unknown) =>
        fromJsonToOrder(data)
      );


      setOrders(orderData);
    } catch (error){
      console.log(error);
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
  

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  return (
    <div className="w-full">
      <CustomTable title="Orders" headers={orderHeaders(users)} data={orders} />
    </div>
  );
};

export default Orders;
