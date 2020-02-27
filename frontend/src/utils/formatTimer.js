const formatTimer = (minutes, hours, walkDuration) => {
  let timerHours;
  let timerMinutes;

  if (hours > 0) {
    timerHours = `${hours}h`;
    timerMinutes = `${minutes - Math.ceil(walkDuration / 60)} min`;

    if (minutes - Math.ceil(walkDuration / 60) < 0) {
      timerHours = `${hours - 1 === 0 ? '' : hours - 1}${hours - 1 > 0 ? 'h' : ''}`;
      timerMinutes = `${60 + (minutes - Math.ceil(walkDuration / 60))} min`;
    }
  } else {
    timerHours = '';
    timerMinutes = `${minutes - Math.ceil(walkDuration / 60)} min`;
  }
  return `${timerHours} ${timerMinutes}`;
};

export default formatTimer;
