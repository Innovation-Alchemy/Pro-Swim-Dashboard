import { useParams } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import { userOrderHeaders } from "../data";
import axios from "axios";
import { useEffect, useState } from "react";
import { fromJsonToOrder, OrderModel } from "../models/order";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const UserDetailsOrders = () => {
  const { id } = useParams<{ id: string }>();
  const [orders, setOrders] = useState<OrderModel[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "shop/user-order?user_id=" + id
        );
        const ordersData: OrderModel[] = response.data["data"].map(
          (data: unknown) => fromJsonToOrder(data)
        );

        console.log(ordersData[0]); // Debugging/logging
        setOrders(ordersData);
      } catch {
        return;
      }
    };
    fetchOrders();
  }, [id]);

  const deleteOrder = async ({ id }: { id: string }) => {
    try {
      await axios.delete(process.env.REACT_APP_BASE_URL + "shop/orders/" + id);
      setOrders((prevOrder) =>
        prevOrder.filter((order) => id != order.id.toString())
      );
    } catch {
      return;
    }
  };

  return (
    <CustomTable
      headers={userOrderHeaders}
      data={orders}
      action={[
        {
          title: "Delete",
          icon: faTrash,
          className: "text-red-600",
          onClick: (row) => {
            deleteOrder({ id: row["id"] });
          },
        },
      ]}
    />
  );
};

export default UserDetailsOrders;
