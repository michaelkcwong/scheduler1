import React from "react"
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"

export default function Appointment(props) {
const formatTime = () => {
  if(props.time) {
    return `Appointment at ${props.time}`
  }
  if(!props.time) {
    return `No Appointments`
  }
};

return (
  <article className="appointment">
    {formatTime()}
  </article>);
}

