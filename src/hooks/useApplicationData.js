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
  return axios.delete(`/api/appointments/${id}`).then((res) => {
    console.log(res);
    setState((prev) => {
      return { ...prev, appointments };
    });
  });
}

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
    console.log(res);
    if (res.status === 204) {
      setState((prev) => {
        return { ...prev, appointments };
      });
    }
  });
}

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
}
}