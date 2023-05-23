import SearchBar from "./components/SearchBar";
import { Client, PlacePhoto } from "@googlemaps/google-maps-services-js";
import Image from "next/image";

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
  // Default Los Angeles Coordinates
  const args = {
    params: {
      key: process.env.NEXT_PUBLIC_PLACES_KEY!,
      place_id: searchParams.location
        ? searchParams.location
        : "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    },
  };

  // const coordinates: Array<Number> = await client
  //   .geocode(args)
  //   .then((gcResponse) => {
  //     // console.log(gcResponse.data.results);
  //     if (gcResponse.data.results.length > 0) {
  //       return [
  //         gcResponse.data.results[0].geometry.location.lat,
  //         gcResponse.data.results[0].geometry.location.lng,
  //       ];
  //     } else {
  //       throw new Error("No results returned from geocoding API");
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     // fallback coordinates
  //   });

  type placeDetailsResponse = {
    coordinates: Array<number>;
    photos: PlacePhoto[];
  };
  //Type Bugs
  const placeDetails: any = await client
    .placeDetails(args)
    .then((placeDetailsResponse) => {
      if (
        placeDetailsResponse.data.result.photos &&
        placeDetailsResponse.data.result.geometry
      ) {
        console.log(placeDetailsResponse.data.result);
        return {
          photos: placeDetailsResponse.data.result.photos,
          coordinates: [
            placeDetailsResponse.data.result.geometry.location.lat,
            placeDetailsResponse.data.result.geometry.location.lng,
          ],
        };
      } else {
        throw new Error("No results returned from place details API");
      }
    })
    .catch((err) => {
      console.error(err);
      return {
        photos: {
          height: 2252,
          html_attributions: [Array],
          photo_reference:
            "AZose0l0yv_s91OrUrrcsH_nCxSboCwy0ZuuBtxonkhogt7C0BPFspBjGTV8O9jSb0zOGs-oX_sTKXKyZfppJC5qZ-gGtLOoLnq2CxI84v4vuYX3q1lgnyiWvjV7RxwdCJDf5IPUo0hr0j4qwx-KgfraPO1SNy9d6J0bv-4xwTDkU-fVl9sn",
          width: 4000,
        },
        coordinates: [34.0522342, -118.2436849],
      };
    });

  const getWeather = async () => {
    try {
      const data = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${placeDetails.coordinates[0]}&longitude=${placeDetails.coordinates[1]}&temperature_unit=fahrenheit&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=PST&current_weather=true`
      );
      const json = await data.json();
      // console.log(json);
      return json;
    } catch (error) {
      // console.log(error);
      return null;
    }
  };

  const weather = await getWeather();

  const getImage = (weathercode: number) => {
    if (weathercode == 0 || weathercode == 1) {
      return (
        <Image alt="weather" src="clear-day.svg" width={200} height={200} />
      );
    } else if (weathercode == 2) {
      return <Image alt="weather" src="cloudy.svg" width={200} height={200} />;
    } else if (weathercode == 3) {
      return (
        <Image alt="weather" src="overcast.svg" width={200} height={200} />
      );
    } else if (weathercode == 45 || weathercode == 48) {
      return <Image alt="weather" src="fog.svg" width={200} height={200} />;
    } else if (
      (weathercode >= 51 && weathercode <= 67) ||
      (weathercode >= 80 && weathercode <= 86)
    ) {
      return <Image alt="weather" src="rain.svg" width={200} height={200} />;
    } else if (weathercode >= 71 && weathercode <= 77) {
      return <Image alt="weather" src="snow.svg" width={200} height={200} />;
    } else if (weathercode >= 95) {
      return (
        <Image alt="weather" src="thunderstorm.svg" width={200} height={200} />
      );
    } else {
      return (
        <Image alt="weather" src="clear-day.svg" width={200} height={200} />
      );
    }
  };

  // const photoReference = await placeDetails.photos[0].photo_reference;
  // const photoResponse = await client.placePhoto({
  //   params: {
  //     photoreference: photoReference,
  //     maxheight: 1000,
  //     key: process.env.NEXT_PUBLIC_PLACES_KEY!,
  //   },
  //   responseType: "arraybuffer", // receive the data as ArrayBuffer
  // });

  // // Create a new Blob from the ArrayBuffer and set its MIME type to 'image/jpeg'
  // const photoBlob = new Blob([photoResponse.data], { type: "image/png" });
  // const blob = URL.createObjectURL(photoBlob);

  return (
    <div>
      {/* Left Hand Side */}
      <div>
        <div>
          <SearchBar location="" />
          <div>{placeDetails.coordinates[0].toString()}</div>
          <div>{placeDetails.coordinates[1].toString()}</div>
          {/* Weather Icon */}
          {getImage(weather.current_weather.weathercode)}
          {/* Temperature and Time */}
          <div>
            {weather && weather.current_weather.temperature
              ? weather.current_weather.temperature
              : "Loading..."}
          </div>
          <div>
            {weather && weather.current_weather
              ? weather.current_weather.time.slice(-5)
              : "Loading..."}
          </div>
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
