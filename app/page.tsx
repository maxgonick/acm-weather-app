import SearchBar from "./components/SearchBar";
import {
  Client,
  PlaceDetailsResponse,
  PlacePhoto,
} from "@googlemaps/google-maps-services-js";
import Image from "next/image";
import WeeklyCards from "./components/WeeklyCards";
import HighlightCards from "./components/HighlightCards";

type Props = {
  searchParams?: {
    location?: string;
  };
};

const Page = async ({
  searchParams = { location: "ChIJE9on3F3HwoAR9AhGJW_fL-I" },
}: Props) => {
  //Instantiate Google API connection
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

  //Return useful details such as coordinates from the searched location using google maps SDK
  const placeDetails: { name: string; coordinates: Array<number> } =
    await client
      .placeDetails(args)
      .then((placeDetailsResponse) => {
        if (placeDetailsResponse.data.result.geometry) {
          console.log(placeDetailsResponse.data.result);
          return {
            // photos: placeDetailsResponse.data.result.photos,
            name: placeDetailsResponse.data.result.name!,
            coordinates: [
              placeDetailsResponse.data.result.geometry.location.lat!,
              placeDetailsResponse.data.result.geometry.location.lng!,
            ],
          };
        } else {
          throw new Error("No results returned from place details API");
        }
      })
      .catch((err) => {
        console.error(err);
        return {
          // photos: {
          //   height: 2252,
          //   html_attributions: [Array],
          //   photo_reference:
          //     "AZose0l0yv_s91OrUrrcsH_nCxSboCwy0ZuuBtxonkhogt7C0BPFspBjGTV8O9jSb0zOGs-oX_sTKXKyZfppJC5qZ-gGtLOoLnq2CxI84v4vuYX3q1lgnyiWvjV7RxwdCJDf5IPUo0hr0j4qwx-KgfraPO1SNy9d6J0bv-4xwTDkU-fVl9sn",
          //   width: 4000,
          // },
          name: "Los Angeles",
          coordinates: [34.0522342, -118.2436849],
        };
      });

  //Return weather data from the searched location
  const getWeather = async () => {
    try {
      const data = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${placeDetails.coordinates[0]}&longitude=${placeDetails.coordinates[1]}&temperature_unit=fahrenheit&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,sunrise,sunset,uv_index_max&timezone=auto&current_weather=true`,
        { cache: "no-store" }
      );
      const json = await data.json();
      console.log(json);
      return json;
    } catch (error) {
      // console.log(error);
      return null;
    }
  };
  const weather = await getWeather();
  // console.log(weather);

  //Properly render appropriate SVG depending on weather conditions (mapping weathercode to one of the served SVGS)
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
  //Map weather code to string describing the weather
  const weatherConditions = (weathercode: number): string => {
    if (weathercode == 0 || weathercode == 1) {
      return "Clear Day";
    } else if (weathercode == 2) {
      return "Cloudy Day";
    } else if (weathercode == 3) {
      return "Overcast Day";
    } else if (weathercode == 45 || weathercode == 48) {
      return "Foggy Day";
    } else if (
      (weathercode >= 51 && weathercode <= 67) ||
      (weathercode >= 80 && weathercode <= 86)
    ) {
      return "Rainy Day";
    } else if (weathercode >= 71 && weathercode <= 77) {
      return "Snowy Day";
    } else if (weathercode >= 95) {
      return "Thunderstorms";
    } else {
      return "Clear Day";
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Hand Side */}
      <div className="w-1/4">
        <div>
          <SearchBar />
          {/* <div>{placeDetails.coordinates[0].toString()}</div>
          <div>{placeDetails.coordinates[1].toString()}</div> */}
          {/* Weather Icon */}
          {getImage(weather.current_weather.weathercode)}
          {/* Temperature and Time DONE*/}
          <div className="text-5xl ">
            {weather && weather.current_weather.temperature
              ? weather.current_weather.temperature + "°"
              : "Loading..."}
          </div>
          {/* Render out day and time in a more readable format */}
          <div>
            {weather && weather.current_weather ? (
              <span>
                {weather.current_weather.time.slice(0, -6)}
                &nbsp;
                <span className="text-slate-500">
                  {weather.current_weather.time.slice(-5)}
                </span>
              </span>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
        <div>
          {/* Weather Status */}
          <div>{weatherConditions(weather.current_weather.weathercode)}</div>
          <div className="flex items-center">
            <Image alt="rain" src="rain.svg" width={40} height={40} />
            <span>
              Rain - {weather.daily.precipitation_probability_mean[0]}%
            </span>
          </div>
          {/* Image of City */}
        </div>
      </div>
      {/* Right Hand Side */}
      <div className="w-3/4 bg-[#F4F4F4] flex flex-col px-[4%] justify-around">
        {/* 7 Day Forecast */}
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-black">
            7 Day Forecast at {placeDetails ? placeDetails.name : "Los Angeles"}
          </h1>
          <WeeklyCards
            highs={weather.daily.temperature_2m_max}
            lows={weather.daily.temperature_2m_min}
            images={weather.daily.weathercode}
            days={weather.daily.time}
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-black">Daily Highlights</h1>
          {/* Today's Highlights */}
          <HighlightCards
            UVIndex={weather.daily.uv_index_max[0]}
            mph={weather.current_weather.windspeed}
            sunrise={weather.daily.sunrise[0]}
            sunset={weather.daily.sunset[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
//
