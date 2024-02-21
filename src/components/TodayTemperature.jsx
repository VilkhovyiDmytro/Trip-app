import { getDay } from "../helpers/getDay";
import { icons } from "../helpers/icons";
import { useGetWeatherOnTodayByCityNameQuery } from "../redux/citiesWeatherApi";
import Timer from "./Timer";
import styles from "./TodayTemperature.module.css";

function TodayTemperature({ trip }) {
  const { data } = useGetWeatherOnTodayByCityNameQuery(trip.city.name);
  // console.log("DATA", data);

  if (!data) return;

  return (
    <section className={styles.wrapper}>
      <h3>{getDay(data.days[0].datetime)}</h3>
      <p className={styles.weather}>
        <i>{icons[data.days[0].icon.replaceAll("-", "")]}</i>
        <span>{data.days[0].temp}</span>
      </p>
      <h4>{data.resolvedAddress}</h4>
      <Timer targetDate={trip.startDate} />
    </section>
  );
}

export default TodayTemperature;
