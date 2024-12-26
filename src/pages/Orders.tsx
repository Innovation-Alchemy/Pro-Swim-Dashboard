import axios from "axios";
import CustomTable from "../components/CustomTable";
import { orderHeaders } from "../data";
import { useEffect, useState } from "react";
import { fromJsonToOrder, OrderModel } from "../models/order";

const Orders = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/orders"
      );

      console.log(response.data["data"][0]);

      const orderData = response.data["data"].map((data: unknown) =>
        fromJsonToOrder(data)
      );

      console.log(orderData);

      setOrders(orderData);
    } catch {
      return;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full">
      <CustomTable title="Orders" headers={orderHeaders} data={orders} />
    </div>
  );
};

export default Orders;
