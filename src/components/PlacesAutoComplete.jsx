import { getDetails, getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import styles from "./PlacesAutoComplete.module.css";

const PlacesAutocomplete = ({ onSetCity, values }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = values;

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    async () => {
      setValue(description, false);
      clearSuggestions();

      const [response] = await getGeocode({
        address: description,
        language: "en",
      });
      const data = await getDetails({
        placeId: response.place_id,
        language: "en",
      });

      const { lat, lng } = getLatLng(data);

      onSetCity({
        lat: lat,
        lng: lng,
        name: `${response.address_components[0].short_name},${response.address_components[3].short_name}`,
        description: description,
        photo: data.photos[0].getUrl(),
        refToGoogleMap: data.url,
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className={styles.option_li}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className={styles.background_wrap}>
      <label htmlFor="cityInput">City</label>
      <div className={styles.input_wrap}>
        <input
          id="cityInput"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Please start write and select a city "
          required={true}
          onReset={() => {
            setValue("");
            clearSuggestions();
          }}
        />
        <div className={styles.sugg_cont}>
          {status === "OK" && <dl>{renderSuggestions()}</dl>}
        </div>
      </div>
    </div>
  );
};

export default PlacesAutocomplete;
