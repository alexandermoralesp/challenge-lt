import { useState, useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";

import Modal from "./components/Modal";
import asyncWrapper from "./lib/asyncWrapper";
import CreateBookingSection from "./components/CreateBookingSection";
import { BookingsService } from "./services/bookings";
import { Booking, BookingResponse } from "./services/types";
import IconButton from "./components/IconButton";
import { AxiosError } from "axios";
import "./index.css"
import CardBooking from "./components/CardBooking";
import SucessAlert from "./components/SucessAlert";


export default function App() {
  const [showCreateBookingModal, setShowCreateBookingModal] =
    useState<boolean>(false);
  // Alter after submit booking
  const [submit, setSubmit] = useState<number>(0);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      id: 1,
      buyer: "A",
      provider: "B",
      details: "C",
      duration: 12,
    },
    {
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      id: 1,
      buyer: "A",
      provider: "B",
      details: "C",
      duration: 12,
    }
  ]);
  const useNewBookingForm = useForm<BookingResponse>({
    defaultValues: { date: new Date().toISOString() },
  });
  const removeBooking = async (idx: any) => {
    const nbooking = [...bookings];
    nbooking.splice(idx, 1);
    setBookings(nbooking);
  }
  const createNewBooking = async () => {
    const data = useNewBookingForm.getValues();
    const [res, err] = await asyncWrapper(BookingsService.createBooking(data));
    if (err) {
      console.log("Error in creating Booking");
      console.error(err);
    }
    if (res) {
      setShowCreateBookingModal(false);
      fetchBookings();
      setSubmit(1);
      await new Promise(f => setTimeout(f, 1800));
      setSubmit(0);
    } else {
      setSubmit(2);
      await new Promise(f => setTimeout(f, 1800));
      setSubmit(0);
    }
    useNewBookingForm.reset();
  };
  const fetchBookings = async () => {
    const [res, err] = await asyncWrapper<BookingResponse[], AxiosError>(
      BookingsService.getBookings()
    );

    if (err) {
      console.log("Error in fetching Booking");
      console.error(err);
      throw new Error("Error in fetching Booking");
    }

    if (res) {
      // Parse string date to Date object
      const bookings = res.map((booking) => ({
        ...booking,
        date: new Date(booking.date),
        created_at: new Date(booking.created_at),
        updated_at: new Date(booking.updated_at),
      }));

      setBookings(bookings);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="text-center">
      <div className="absolute z-0 bottom-0 flex justify-center w-full">
        {submit === 1 ? <SucessAlert /> : null}
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
        <p className="text-xl font-bold">Reto Luteach</p>
        <IconButton
          onClick={() => {
            setShowCreateBookingModal(true);
          }}
        >
          Crear
        </IconButton>
        <div className="w-full flex flex-col items-center">
          <p className="font-bold text-primary-dark">Lista de bookings:</p>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking, index) => {
              return (
                <CardBooking index={index} buyer={booking.buyer} date={booking.date.toDateString()} provider={booking.provider} duration={booking.duration} removeBooking={removeBooking} />
              );
            })

          ) : (
            <div className="m-5">- No hay reservas</div>
          )}
        </div>
      </div>
      <Modal open={showCreateBookingModal} setOpen={setShowCreateBookingModal}
        submit={submit}
      >
        <CreateBookingSection
          useNewBookingForm={useNewBookingForm}
          createNewBooking={createNewBooking}
        >
          <div>
            <p className="font-bold text-lg">Agendar una cita</p>
          </div>
        </CreateBookingSection>
      </Modal>
    </div>
  );
}
