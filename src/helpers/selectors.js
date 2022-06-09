export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  state.days.forEach((obj) => {
    if (obj.name === day) {
      const appointmentList = obj.appointments;
      appointmentList.forEach((i) => {
        filteredAppointments.push(state.appointments[i]);
      });
    }
  });
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (interview) {
    for (let i in state.interviewers) {
      if (interview.interviewer === state.interviewers[i].id) {
        return {
          ...interview,
          interviewer: state.interviewers[i],
        };
      }
    }
  }
  return null;
}
