import SearchBar from "./components/SearchBar";
import { LoadScript } from "@react-google-maps/api";

type Props = {
  searchParams?: {
    location?: string;
  };
};

const placeIdtoCoords = async (placeId: string) => {};

interface Location {
  label: string;
  value: any;
}

const Page = ({ searchParams = { location: "default" } }: Props) => {
  const handleLocation = (location: any) => {
    console.log(location);
  };

  return (
    <div>
      {/* Left Hand Side */}
      <div>
        <div>
          <SearchBar location="" />
          <div>{searchParams.location}</div>
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
