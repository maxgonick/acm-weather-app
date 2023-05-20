import SearchBar from "./components/SearchBar";

type Props = {};

interface Location {
  label: string;
  value: any;
}

const page = (props: Props) => {
  const handleLocation = (location: any) => {
    console.log(location);
  };

  return (
    <div>
      {/* Left Hand Side */}
      <div>
        <div>
          <SearchBar />
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

export default page;
