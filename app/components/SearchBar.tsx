"use client";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

type Props = {
  //   onLocationChange: (location: any) => void;
};

const SearchBar = (props: Props) => {
  const pathname = usePathname();
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_PLACES_KEY}
        selectProps={{
          onChange: (location) => {
            // const searchParams = new URLSearchParams(window.location.search);
            // searchParams.set("displaymode", location?.value.);
            console.log(location);
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
