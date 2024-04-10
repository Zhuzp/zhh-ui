import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import {MiniCalendar} from "./components/index";
import "./index.scss";
console.log(MiniCalendar)

interface CalendarRef {
  getDate: () => Date,
  setDate: (date: Date) => void
}

const Calendar = React.forwardRef(MiniCalendar);

const App = () => {
  const calendarRef = useRef<CalendarRef>(null);
  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString());
    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1))
    }, 3000)
  }, [])
  return (
    // <div className="example">
    //   <div className="title">Example</div>
    //   <EncryptedInput
    //     initValue="我爱你啊梦"
    //     front="1"
    //     end="2"
    //     onChange={(d1, d2) => {
    //       console.log(d1, d2);
    //     }}
    //     mode="plain"
    //   />
    // </div>
    <Calendar ref={calendarRef} value={new Date('2024-8-15')}></Calendar>    // <div>
    //   111
    // </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

