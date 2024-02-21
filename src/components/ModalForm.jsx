import { useState } from "react";
import PlacesAutocomplete from "./PlacesAutoComplete";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useDispatch } from "react-redux";
import { addTrip } from "../redux/tripsSlicer";
import styles from "./ModalForm.module.css";

const initialFormData = {
  startDate: "",
  endDate: "",
  city: {},
};

function ModalForm({ onSetModal }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const values = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      language: "en",
    },
    debounce: 300,
  });

  function hanldeSubmit(e) {
    e.preventDefault();
    const now = new Date().getTime();
    let startDate = new Date(formData.startDate).getTime();
    let endDate = new Date(formData.endDate).getTime();
    const maxDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 14;
    if (!formData.startDate) {
      setError("Please, select correct date of start of your trip");
      return;
    }
    if (!formData.endDate) {
      setError("Please, select correct date of end of your trip");
      return;
    }

    if (!formData.city?.name) {
      setError("You must chose city!!!");
      return;
    }
    if (now > startDate) {
      setError("Your adventure must begin after today");
      return;
    } else if (startDate > maxDate) {
      setError("Your adventure must begin earliest then 14th days from today");
      return;
    }
    if (now > endDate) {
      setError("Your adventure can't be finished early than today");
      return;
    } else if (endDate > maxDate) {
      setError("Your adventure must begin earliest then 14th days from today");
      return;
    }
    if (startDate > endDate) {
      setError("Your finish of adventure can't be earlier than begining");
      return;
    }
    dispatch(addTrip(formData));
    setFormData(initialFormData);
    setError("");
    onSetModal(false);
  }

  function handleSetStartDate(date) {
    let dateForm = new Date(date);
    dateForm.setHours(0);
    dateForm.getTime();
    const now = new Date().getTime();
    const maxDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 14;
    if (now > dateForm) {
      setError("Your adventure must begin after today");
      return;
    } else if (dateForm > maxDate) {
      setError("Your adventure must begin earliest then 14th days from today");
      return;
    }
    setFormData((data) => ({ ...data, startDate: date }));
    setError("");
  }

  function handleSetCity(city) {
    setFormData((data) => ({ ...data, city: city }));
  }

  function handleSetEndDate(date) {
    let dateForm = new Date(date);
    dateForm.setHours(0);
    dateForm.getTime();
    const now = new Date().getTime();
    const maxDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 14;
    if (now > dateForm) {
      setError("Your adventure must end after today");
      return;
    } else if (dateForm > maxDate) {
      setError("Your adventure must end earlies then 14th days from today");
      return;
    }
    setFormData((data) => ({ ...data, endDate: date }));
    setError("");
  }

  return (
    <div
      className={styles.bg_cont}
      id="bg_cont"
      onClick={(e) => {
        if (e.target.id === "bg_cont") onSetModal(false);
      }}
    >
      <article className={styles.modal_wrap}>
        <header className={styles.header_modal}>
          <h2>Create trip</h2>
          <span onClick={() => onSetModal(false)} style={{ cursor: "pointer" }}>
            X
          </span>
        </header>
        <hr />

        <form onSubmit={hanldeSubmit}>
          <PlacesAutocomplete onSetCity={handleSetCity} values={values} />
          <div className={styles.label_input_wrap}>
            <label htmlFor="startDate"> Start date</label>
            <input
              required={true}
              type="date"
              id="startDate"
              onChange={(e) => handleSetStartDate(e.target.value)}
            />
          </div>
          <div className={styles.label_input_wrap}>
            <label htmlFor="endDate"> End date</label>
            <input
              required={true}
              type="date"
              id="endDate"
              onChange={(e) => handleSetEndDate(e.target.value)}
            />
          </div>
          <div className={styles.btn_wrap}>
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
          </div>
          <p className={styles.error_text}>{error}</p>
        </form>
      </article>
    </div>
  );
}

export default ModalForm;
