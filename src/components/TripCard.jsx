/* eslint-disable react/prop-types */
import styles from "./TripCard.module.css";
import { useGetWeatherOnTodayByCityNameQuery } from "../redux/citiesWeatherApi";

function CityCard({ city }) {
  const { data } = useGetWeatherOnTodayByCityNameQuery(city.name);
  console.log(data);
  //   console.log(city);
  return (
    <li>
      <img src={city.photo} className={styles.main_img} alt="" />
      <p>{city.description}</p>
    </li>
  );
}

export default CityCard;
