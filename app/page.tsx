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

const Page = async ({ searchParams }: Props) => {
  const client = new Client({});

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
      console.log(gcResponse);
      return [
        gcResponse.data.results[0].geometry.location.lat,
        gcResponse.data.results[0].geometry.location.lng,
      ];
    })
    .catch((err) => [34.0522, -118.2437]);

  const getWeather = async () => {
    try {
      const data = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[0]}&temperature_unit=fahrenheit?daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=PST`
      );
      return data.json();
    } catch (error) {
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
        </div>
        <div>
          {/* Weather Status */}
          {/* Image of City */}
        </div>
      </div>
      {/* Right Hand Side */}
      <div>
        {/* 7 Day Forecast */}
        {/* Today's Highlights */}
      </div>
    </div>
  );
};

export default Page;
