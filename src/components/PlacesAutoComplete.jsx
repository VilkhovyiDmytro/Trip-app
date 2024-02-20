import { getDetails, getGeocode, getLatLng } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

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

  //  AIzaSyA25kEbbGNpgMtE_Dzx2XlU9heJZz3BPOI

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
        name: `${response.address_components[0].short_name}, ${response.address_components[3].short_name}`,
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
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where will your next trip be?"
        onReset={() => {
          setValue("");
          clearSuggestions();
        }}
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete;
