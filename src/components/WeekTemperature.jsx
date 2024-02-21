import { getDay } from "../helpers/getDay";
import { icons } from "../helpers/icons";
import { useGetWeatherOnTripPeriodQuery } from "../redux/citiesWeatherApi";
import styles from "./WeekTemperature.module.css";

function WeekTemperature({ trip }) {
  const { data } = useGetWeatherOnTripPeriodQuery(
    `${trip.city.name}/${trip.startDate}/${trip.endDate}`
  );

  if (!data) return;
  return (
    <>
      <h3>WEATHER ON WEEK:</h3>
      <ul className={styles.main_cont}>
        {data.days.map((day, i) => {
          return (
            <li className={styles.wraper} key={i}>
              <p className={styles.day}>{getDay(day.datetime)}</p>
              <p className={styles.date}>{day.datetime}</p>
              <i className={styles.icon}>
                {icons[day.icon.replaceAll("-", "")]}
              </i>
              <p className={styles.temp}>
                {day.tempmin} / {day.tempmax}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default WeekTemperature;
