import { useTimer } from "../contexts/TimerContext";

function Timer() {
  const { time } = useTimer();
  return <div>{time}</div>;
}
export default Timer;
