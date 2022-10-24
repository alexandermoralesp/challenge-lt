import { useEffect, useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { UpdateDays } from "../lib/calendar";
import classNames from "../lib/classNames";


type Tdays = {
  date: Date;
  isCurrentMonth?: boolean;
  isToday?: boolean;
};

type DatepickerProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const Datepicker = ({ selectedDate, setSelectedDate }: DatepickerProps) => {
  const [month, setMonth] = useState<Date>(selectedDate ? new Date(selectedDate) : new Date());
  const [days, setDays] = useState<Tdays[]>(UpdateDays(month));

  useEffect(() => {
    setDays(UpdateDays(month));
  }, [month]);

  return (
    <div className="flex flex-col text-center">
      <div className="flex justify-between items-center text-gray-900">
        <button
          type="button"
          onClick={() =>
            setMonth(
              new Date(
                new Date(month.setMonth(month.getMonth() - 1)).setHours(selectedDate.getHours()),
              ),
            )
          }
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className=" font-semibold">
          {month.toLocaleDateString("es", { month: "long", year: "numeric" }).toUpperCase()}
        </div>
        <button
          type="button"
          onClick={() => {
            setMonth(
              new Date(
                new Date(month.setMonth(month.getMonth() + 1)).setHours(selectedDate.getHours()),
              ),
            );
          }}
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        <div>L</div>
        <div>M</div>
        <div>M</div>
        <div>J</div>
        <div>V</div>
        <div>S</div>
        <div>D</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => {
          const isSelected =
            selectedDate && day.date.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={dayIdx}
              type="button"
              onClick={() => {
                const newSelectedDate = new Date(day.date.setHours(month.getHours()));
                if (newSelectedDate  < new Date()) alert("No puedes seleccionar una fecha antes de la actual")
                else setSelectedDate(newSelectedDate);
              }}
              className={classNames(
                "py-1.5 hover:bg-gray-100 focus:z-10",
                day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                isSelected || day.isToday ? "font-semibold" : "",
                isSelected ? "text-white" : "",
                !isSelected && day.isCurrentMonth && !day.isToday ? "text-gray-900" : "",
                !isSelected && !day.isCurrentMonth && !day.isToday ? "text-gray-400" : "",
                day.isToday && !isSelected ? "text-primary" : "",
                dayIdx === 0 ? "rounded-tl-lg" : "",
                dayIdx === 6 ? "rounded-tr-lg" : "",
                dayIdx === days.length - 7 ? "rounded-bl-lg" : "",
                dayIdx === days.length - 1 ? "rounded-br-lg" : "",
              )}
            >
              <time
                dateTime={day.date.toDateString()}
                className={classNames(
                  "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                  isSelected && day.isToday ? "bg-primary" : "",
                  isSelected && !day.isToday ? "bg-gray-900 " : "",
                )}
              >
                {day.date.getDate()}
              </time>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Datepicker;
