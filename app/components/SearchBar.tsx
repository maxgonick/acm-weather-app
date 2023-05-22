"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

type Props = {
  //   onLocationChange: (location: any) => void;
  location: string | null;
};

const SearchBar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = useState(props.location ?? "");

  useEffect(() => {
    console.log("WORK");
    console.log(value);
    const debounceTimeout = setTimeout(() => {
      router.replace(
        value === "" ? "/" : `/?location=${encodeURIComponent(value)}`
      );
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [value]);

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_PLACES_KEY}
        selectProps={{
          onChange: (location) => {
            setValue(location?.value.place_id);
            // const searchParams = new URLSearchParams(window.location.search);
            // searchParams.set("displaymode", location?.value.);
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
