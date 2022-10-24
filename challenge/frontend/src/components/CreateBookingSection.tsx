import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import Datepicker from "./Datepicker";
import IconButton from "./IconButton";

import { BookingResponse } from "@/services/types";

import { PencilAltIcon } from "@heroicons/react/outline";
import InputTopics from "./InputText";

type CreateBookingSectionProps = {
  children: React.ReactNode;
  useNewBookingForm: UseFormReturn<BookingResponse, any>;
  createNewBooking: () => Promise<void>;
};

const CreateBookingSection = ({
  children,
  useNewBookingForm,
  createNewBooking,
}: CreateBookingSectionProps) => {
  const [createBookingStep, setCreateBookingStep] =
    useState<string>("SELECT_DATE");
  const [activeButton, setActiveButton] = useState<boolean>(true);

  const handleSelectStartTime = (startTime: Date) => {
    useNewBookingForm.setValue("date", startTime.toISOString());
    if (useNewBookingForm.getValues("duration"))
      setCreateBookingStep("SUMMARY");
    else setCreateBookingStep("SELECT_DURATION");
  };

  const displayCreateBooking = (step: string) => {
    const timeFormat: Intl.DateTimeFormatOptions = {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    };
    const selectedDate = new Date(useNewBookingForm.getValues("date"));
    switch (step) {
      case "SELECT_DATE":
        const setSelectedDate = (date: Date) => {
          useNewBookingForm.setValue("date", date.toISOString());
          if (useNewBookingForm.getValues("duration"))
            setCreateBookingStep("SUMMARY");
          else setCreateBookingStep("SELECT_START_TIME");
        };

        return (
          <Datepicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        );
      case "SELECT_START_TIME":
        const time = new Date();
        time.setHours(5, 0, 0, 0);

        return (
          <div>
            <p
              onClick={() => setCreateBookingStep("SELECT_DATE")}
              className="cursor-pointer text-sm pb-2 text-gray-500 w-fit"
            >
              {"< Volver"}
            </p>
            <div className="flex flex-col justify-center items-center text-lg">
              <p> Hora de Inicio</p>
              <div className="flex flex-wrap justify-around space-y-2 ">
                {Array.from({ length: 18 }, (x, i) => {
                  time.setHours(time.getHours() + 1);
                  return (
                    <IconButton
                      key={i}
                      onClick={() =>
                        handleSelectStartTime(
                          new Date(selectedDate.setHours(i + 6, 0, 0, 0))
                        )
                      }
                    >
                      {time.toLocaleTimeString("es", timeFormat)}
                    </IconButton>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case "SELECT_DURATION":
        return (
          <div>
            <p
              onClick={() => setCreateBookingStep("SELECT_START_TIME")}
              className="cursor-pointer text-sm pb-2 text-gray-500 w-fit"
            >
              {" "}
              {"< Volver"}
            </p>
            <div className="flex flex-col justify-center items-center text-lg">
              <p> Duración de la cita</p>
              <div className="flex flex-col justify-center space-y-2  ">
                {Array.from({ length: 4 }, (x, i) => {
                  return (
                    <IconButton
                      onClick={() => {
                        useNewBookingForm.setValue("duration", (i + 1) * 60);
                        setCreateBookingStep("SUMMARY");
                      }}
                    >
                      {`${i + 1} hora${i > 0 ? "s" : ""}`}
                    </IconButton>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case "SUMMARY":
        const values = useNewBookingForm.getValues();
        const durationHours = values.duration / 60;
        return (
          <div>
            <p
              onClick={() => setCreateBookingStep("SELECT_DURATION")}
              className="cursor-pointer text-sm pb-2 text-gray-500 w-fit"
            >
              {" "}
              {"< Volver"}
            </p>
            <div className="flex flex-col justify-start">
              <p className=" text-lg">Resumen</p>
              <div className="flex flex-col justify-center text-base font-bold  min-w-full space-y-1">
                <InputTopics
                  title="Comprador:"
                  register={useNewBookingForm.register}
                  name="buyer"
                />
                <InputTopics
                  title="Proveedor:"
                  register={useNewBookingForm.register}
                  name="provider"
                />
                <InputTopics
                  title="Detalles:"
                  register={useNewBookingForm.register}
                  name="details"
                />

                <p className="flex flex-row items-center">
                  Fecha:
                  <span className="mx-2 font-light">
                    {new Date(values.date).toLocaleDateString("es", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => {
                      setCreateBookingStep("SELECT_DATE");
                    }}
                  >
                    <PencilAltIcon height={20} />
                  </button>{" "}
                </p>
                <p className="flex flex-row items-center">
                  Hora de la cita:
                  <span className="mx-2 font-light">
                    {new Date(values.date).toLocaleTimeString("es", timeFormat)}
                  </span>
                  <button
                    onClick={() => {
                      setCreateBookingStep("SELECT_START_TIME");
                    }}
                  >
                    <PencilAltIcon height={20} />
                  </button>
                </p>
                <p className="flex flex-row items-center">
                  Duración de la cita:
                  <span className="mx-2 font-light">
                    {durationHours} {durationHours > 1 ? "horas" : "hora"}
                  </span>
                  <button
                    onClick={() => {
                      setCreateBookingStep("SELECT_DURATION");
                    }}
                  >
                    <PencilAltIcon height={20} />
                  </button>
                </p>
              </div>

              <div className="w-fit text-center self-center mt-2">
                <IconButton
                  activeButton={activeButton}
                  onClick={() => {
                    setActiveButton(false);
                    createNewBooking();
                    setActiveButton(true)
                  }}
                >
                  Añadir cita
                </IconButton>
              </div>
            </div>
          </div>
        );
      default:
        setCreateBookingStep("SELECT_DATE");
    }
  };

  return (
    <div className="space-y-3">
      <>
        {children}
        {displayCreateBooking(createBookingStep)}
      </>
    </div>
  );
};

export default CreateBookingSection;
