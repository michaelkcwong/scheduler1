export function getAppointmentsForDay(state, day) {
  const filteredAppointments = [];
  state.days.forEach((obj) => {
    if (obj.name === day) {
      const appointmentList = obj.appointments;
      appointmentList.forEach(i => {
        filteredAppointments.push(state.appointments[i]);
      })
    };
  })
  return filteredAppointments;
}; 