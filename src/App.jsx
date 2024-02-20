import { useDispatch, useSelector } from "react-redux";
import CityCard from "./components/TripCard";
import { selectAttTrips } from "./redux/selectors";
import { useEffect } from "react";
import { getTripsLS } from "./helpers/tripsLS";
import { addTrip, setTrips } from "./redux/tripsSlicer";
import ModalForm from "./components/ModalForm";

import styles from "./App.module.css";

function App() {
  const trips = useSelector(selectAttTrips);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const tripsLS = getTripsLS();
  //   if (tripsLS) {
  //     dispatch(setTrips(tripsLS));
  //   } else {
  //     dispatch(addTrip({
  //       startDate:
  //     }));
  //   }
  // }, []);
  console.log("TRIPS", trips);

  return (
    <>
      <header className={styles.header_app}>
        Weather <strong>Forecast</strong>
      </header>
      <main className={styles.main_cont}>
        <section className={styles.search_wrap}>
          <label htmlFor="searchBar">🔎</label>
          <input
            type="text"
            placeholder="Search your trip"
            className={styles.search_bar}
            id="searchBar"
          />
        </section>

        <section className={styles.trips_list_wrap}>
          <h1>LIST OF TRIPS</h1>
          <ul>
            {trips.map((city) => (
              <CityCard city={city} key={city.id} />
            ))}
          </ul>
        </section>
        <section className={styles.week_weather_cont}>WATHER ON WEEK</section>
        <section className={styles.weather_one_day}>
          Weather on one day, and timer
        </section>
      </main>
      <ModalForm />
      <footer></footer>
    </>
  );
}

export default App;
