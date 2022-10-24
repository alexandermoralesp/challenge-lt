import { useEffect, useState } from "react";
import { getBookings } from "../services/bookings";

const TestComponent = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const response = await getBookings();
    setBookings(response);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <div>Bookings</div>
      <div>
        {bookings.map((booking) => {
          return "hola";
        })}
      </div>
    </div>
  );
};

export default TestComponent;
