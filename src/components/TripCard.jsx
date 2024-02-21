import styles from "./TripCard.module.css";
import { useDispatch } from "react-redux";
import { deleteTrip } from "../redux/tripsSlicer";

function CityCard({ city, setSelectedTrip }) {
  const dispatch = useDispatch();

  return (
    <li className={styles.wraper}>
      <img
        src={city.city.photo}
        className={styles.main_img}
        alt=""
        onClick={() => setSelectedTrip(city)}
      />
      <button
        className={styles.dlt_btn}
        onClick={() => dispatch(deleteTrip(city.id))}
      >
        delete
      </button>
      <h6>{city.city.description}</h6>
      <p>
        {city.startDate} / {city.endDate}
      </p>
    </li>
  );
}

export default CityCard;
