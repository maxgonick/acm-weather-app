import SearchBar from "./components/SearchBar";
import { Client } from "@googlemaps/google-maps-services-js";

type Props = {
  searchParams?: {
    location?: string;
  };
};

interface Location {
  label: string;
  value: any;
}

const Page = async ({
  searchParams = { location: "ChIJE9on3F3HwoAR9AhGJW_fL-I" },
}: Props) => {
  const client = new Client({});
  console.log("test");
  // Default Los Angeles Coordinates
  const args = {
    params: {
      key: process.env.NEXT_PUBLIC_PLACES_KEY!,
      place_id: searchParams.location
        ? searchParams.location
        : "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    },
  };

  const coordinates: Array<Number> = await client
    .geocode(args)
    .then((gcResponse) => {
      return [
        gcResponse.data.results[0].geometry.location.lat,
        gcResponse.data.results[0].geometry.location.lng,
      ];
    })
    .catch((err) => [34.0522, -118.2437]);

  const getWeather = async () => {
    try {
      const data = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&temperature_unit=fahrenheit&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=PST&current_weather=true`
      );
      const json = await data.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const weather = await getWeather();

  return (
    <div>
      {/* Left Hand Side */}
      <div>
        <div>
          <SearchBar location="" />
          <div>{coordinates[0].toString()}</div>
          <div>{coordinates[1].toString()}</div>
          {/* Weather Icon */}
          {/* Temperature and Time */}
          <div>
            {weather.current_weather
              ? weather.current_weather.temperature
              : "Loading..."}
          </div>
          <div>
            {weather.current_weather
              ? weather.current_weather.time.slice(-5)
              : "Loading..."}
          </div>
          <div>{}</div>
        </div>
        <div>
          {/* Weather Status */}
          {/* Image of City */}
        </div>
      </div>
      {/* Right Hand Side */}
      <div>
        {/* 7 Day Forecast */}
        <ul>
          {weather && weather.daily.temperature_2m_max
            ? weather.daily.temperature_2m_max.map(
                (day: any, index: number) => <li key={index}>{day}</li>
              )
            : Array(7)
                .fill(null)
                .map((_, index) => <li key={index}>Loading</li>)}
        </ul>
        {/* Today's Highlights */}
      </div>
    </div>
  );
};

export default Page;
