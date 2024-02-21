import { useSelector } from "react-redux";
import CityCard from "./components/TripCard";
import { selectAttTrips } from "./redux/selectors";
import { useEffect, useRef, useState } from "react";
import ModalForm from "./components/ModalForm";

import styles from "./App.module.css";
import WeekTemperature from "./components/WeekTemperature";
import TodayTemperature from "./components/TodayTemperature";

function App() {
  const trips = useSelector(selectAttTrips);
  // ☁️⛅⛈️🌤️🌥️🌦️🌧️🌨️🌩️🌪️
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);
  const [showModal, setShowModal] = useState(false);
  const [sortedTrips, setSortedTrips] = useState(trips);
  const [sortByStart, setSortByStart] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (trips.length >= 1) setSelectedTrip(trips[0]);

    setSortedTrips(trips);
  }, [trips]);

  useEffect(() => {
    if (sortByStart) {
      setSortedTrips((trips) =>
        trips
          .slice()
          .sort((a, b) => new Date(a.startDate) - new Date(b.endDate))
      );
    } else {
      setSortedTrips(trips);
    }
  }, [sortByStart]);

  function filterByCityName(name) {
    setSortedTrips(() =>
      trips.filter((trip) => {
        return trip.city.name.toLowerCase().startsWith(name.toLowerCase());
      })
    );
  }

  if (!trips) return;

  return (
    <>
      {showModal && <ModalForm onSetModal={setShowModal} />}
      <header className={styles.header_app}>
        Weather <strong>Forecast</strong>
      </header>
      <hr />
      <main className={styles.main_cont}>
        <section className={styles.search_wrap}>
          <i>🔎</i>
          <input
            type="text"
            placeholder="Search your trip"
            className={styles.search_bar}
            id="searchBar"
            onChange={(e) => filterByCityName(e.target.value)}
          />

          <span
            style={{
              marginLeft: "1rem",
              backgroundColor: sortByStart ? "darkgray" : "lightgray",
              cursor: "pointer",
              padding: "0.6rem 1.2rem",
              borderRadius: "16px",
              border: sortByStart ? "1px solid black" : "none",
            }}
            onClick={() => setSortByStart((e) => !e)}
          >
            Sort by start
          </span>
        </section>

        <section className={styles.trips_list_wrap}>
          <span
            className={styles.arrow}
            onClick={() =>
              scrollRef.current.scrollBy({ left: -150, behavior: "smooth" })
            }
          >
            ⬅️
          </span>
          <ul className={styles.list_of_trips} ref={scrollRef}>
            {sortedTrips.map((city) => (
              <CityCard
                city={city}
                key={city.id}
                setSelectedTrip={setSelectedTrip}
              />
            ))}
          </ul>
          <span
            onClick={() =>
              scrollRef.current.scrollBy({ left: 150, behavior: "smooth" })
            }
            className={styles.arrow}
          >
            ➡️
          </span>
          <div className={styles.addTrip} onClick={() => setShowModal(true)}>
            <p>+</p>
            <p>Add trip</p>
          </div>
        </section>
        <section className={styles.week_weather_cont}>
          {selectedTrip && <WeekTemperature trip={selectedTrip} />}
        </section>
        <section className={styles.weather_one_day}>
          {selectedTrip && <TodayTemperature trip={selectedTrip} />}
        </section>
      </main>
      <button
        onClick={() =>
          scrollRef.current.scrollBy({ left: 50, behavior: "smooth" })
        }
      >
        SCROLL
      </button>
      <footer></footer>
    </>
  );
}

export default App;
