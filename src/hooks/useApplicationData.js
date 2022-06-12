import React, {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},
});

const setDay = (day) => setState({ ...state, day });

useEffect(() => {
  const daysURL = `/api/days`;
  const appointmentsURL = `/api/appointments`;
  const interviewersURL = `/api/interviewers`;

  Promise.all([
    axios.get(daysURL),
    axios.get(appointmentsURL),
    axios.get(interviewersURL),
  ]).then((all) => {
    setState((prev) => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data,
    }));
  });
}, []);

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null,
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
    const days = updateSpots(-1);
    setState({ ...state, appointments, days });
  });
}

function bookInterview(id, interview, mode) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  return axios.put(`/api/appointments/${id}`, appointment).then(() => {
    if (!state.appointments[id].interview) {
      const days = updateSpots(1);
      setState({
        ...state,
        appointments,
        days,
      });
    } else {
      setState({
        ...state,
        appointments,
      });
    }
  });
}

function updateSpots(number) {
  state.days.forEach((day) => {
    if(day.name === state.day) {
      day.spots -= number;
    }
  });
  return state.days;
}

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}