import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const PlacesAutocomplete = () => {
  // const photoRef =
  //   initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      //   types: ["regions"],
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  //  AIzaSyA25kEbbGNpgMtE_Dzx2XlU9heJZz3BPOI

  //   useEffect(() => {
  // async function fetchFoto(placeId) {
  //     if (!placeId) return;
  //     const data = await fetch(
  //       `https://maps.googleapis.com/maps/api/place/photo?photoreference=${placeId}&maxwidth=400&maxheight=400`,
  //       {}
  //     );
  //     const blob = await data.blob();
  //     const url = URL.createObjectURL(blob);
  //     setPhoto(url);
  //   }

  //   fetchFoto(photoReference);
  //   }, []);

  const handleSelect =
    ({ description }) =>
    async () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      const [response] = await getGeocode({ address: description });
      const data = await getDetails({ placeId: response.place_id });
      console.log("DATA", data.photos[0].getUrl());
      // const proxyUrl = "https://my-cors-anywhere-deployment/";
      // const placesRequestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?placeid=${response.place_id}&key=AIzaSyA25kEbbGNpgMtE_Dzx2XlU9heJZz3BPOI`;

      // const initialPlacesRequest = очікування axios
      // .get(proxyUrl + placesRequestUrl)
      // .catch(console.error);
      // const photoRef = initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
      // const initialPlacesRequest = await axios
      //   .get(proxyUrl + placesRequestUrl)
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch(console.error);
      console.log("DESCIPTION", description);
      const photoReferces = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ7-RHdRGjAhURL2OGWhptgJc&key=AIzaSyA25kEbbGNpgMtE_Dzx2XlU9heJZz3BPOI`,
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            "X-PINGOTHER": "pingpong",
          },
        }
      );
      console.log("REFERENCES", photoReferces);

      // console.log("INITIAL PLACES REQUEST", initialPlacesRequest);

      console.log("RESPONSE", response);
      //   const { lat, lng } = getLatLng(res);
      //   const { place_id: placeId } = response;

      //   console.log("PLACE ID", placeId);

      //   console.log(res);
      //   const data = await getDetails(placeId);
      //   console.log(data);
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
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete;
