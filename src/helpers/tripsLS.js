export function getTripsLS() {
  try {
    const items = window.localStorage.getItem("trips");
    return items ? JSON.parse(items) : undefined;
  } catch (error) {
    console.log(error);
  }
}

export function setTripsLS(value) {
  try {
    window.localStorage.setItem("trips", JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function removeTripsLS() {
  try {
    window.localStorage.removeItem("trips");
  } catch (error) {
    console.log(error);
  }
}
