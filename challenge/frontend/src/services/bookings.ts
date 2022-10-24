// use axios to fetch data from the backend API called CHALLENGE_API
import { CHALLENGE_API } from "../queries/endpoints";
import axios from "axios";

import { BookingResponse, } from "./types";
import { AxiosResponse } from "axios";

export const getBookings = async () => {
  const response = await axios.get(`${CHALLENGE_API}/bookings`);
  return response.data;
}

export const createBooking = async (
  data: BookingResponse,
): Promise<AxiosResponse<BookingResponse>> => {
  const response = await axios.post(`${CHALLENGE_API}/bookings/`, data);
  return response.data;
}

export const BookingsService = {
  getBookings,
  createBooking,
};
