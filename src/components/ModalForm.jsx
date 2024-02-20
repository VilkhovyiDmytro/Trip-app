import { useState } from "react";
import PlacesAutocomplete from "./PlacesAutoComplete";
import usePlacesAutocomplete from "use-places-autocomplete";

function ModalForm() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    city: {},
  });
  const [error, setError] = useState("");

  const values = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      language: "en",
    },
    debounce: 300,
  });

  function hanldeSubmit(e) {
    e.preventDefault();
    let startDate = new Date(formData.startDate).getTime();
    let endDate = new Date(formData.endDate).getTime();
    if (!city) {
      setError("You must chose city!!!");
    }
    if (startDate > endDate) {
      setError("Your finish of adventure can't be earlier than begin");
    }
  }

  function handleSetStartDate(date) {
    let dateForm = new Date(date);
    dateForm.setHours(0);
    dateForm.getTime();
    const now = new Date().getTime();
    const maxDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 14;
    if (now > dateForm) {
      setError("Your adventure must begin not today");
      return;
    } else if (dateForm > maxDate) {
      setError("Your adventure must begin earliest then 14th days from today");
      return;
    }
    setFormData((data) => ({ ...data, startDate: date }));
    setError("");
  }

  function handleSetCity(city) {
    setFormData((data) => ({ ...data, city: { ...city } }));
  }

  function handleSetEndDate(date) {
    let dateForm = new Date(date);
    dateForm.setHours(0);
    dateForm.getTime();
    const now = new Date().getTime();
    const maxDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 14;
    if (now > dateForm) {
      setError("Your adventure must end not today");
      return;
    } else if (dateForm > maxDate) {
      setError("Your adventure must end earlies then 14th days from today");
      return;
    }
    setFormData((data) => ({ ...data, endDate: date }));
    setError("");
  }

  return (
    <article style={{ display: "none", position: "absolute" }}>
      <header>
        <h2>Create trip</h2>
        <span>X</span>
      </header>

      <form onSubmit={hanldeSubmit}>
        <label htmlFor="startDate"> Start date</label>
        <input
          type="date"
          id="startDate"
          onChange={(e) => handleSetStartDate(e.target.value)}
        />
        <label htmlFor="endDate"> End date</label>
        <input
          type="date"
          id="endDate"
          onChange={(e) => handleSetEndDate(e.target.value)}
        />
        <PlacesAutocomplete onSetCity={handleSetCity} values={values} />
        <button
          type="reset"
          onClick={() => {
            values.clearSuggestions();
            values.setValue("");
          }}
        >
          Reset
        </button>
        <button type="submit">Save</button>
        <p>{error}</p>
      </form>
    </article>
  );
}

export default ModalForm;
