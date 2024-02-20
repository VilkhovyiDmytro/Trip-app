import PlacesAutocomplete from "./components/PlacesAutoComplete";
import { useGetWeatherOnTodayByCityNameQuery } from "./redux/citiesWeatherApi";

function App() {
  const { data } = useGetWeatherOnTodayByCityNameQuery("Ternopil,UA");

  console.log(data);
  // console.log("AIzaSyA25kEbbGNpgMtE_Dzx2XlU9heJZz3BPOI");
  // console.log(isSuccess);
  // console.log(new Date().toISOString());
  return (
    <>
      <header>
        Weather <strong>Forecast</strong>
      </header>
      <main>
        <input type="text" placeholder="🔎 Search your trip" />

        <section>
          <nav>
            <ul></ul>
          </nav>
        </section>
        <section>WATHER ON WEEK</section>
        <section>Weather on one day, and timer</section>
        <article>
          <header>Create trip</header>
          <form>
            <label htmlFor=""></label>
            <input type="text" />
            <label htmlFor="startDate"> Start date</label>
            <input type="date" id="startDate" />
            <label htmlFor="endDate"> End date</label>
            <input type="date" id="endDate" />
            <PlacesAutocomplete />
            <button>Cancel</button>
            <button>Save</button>
          </form>
        </article>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
