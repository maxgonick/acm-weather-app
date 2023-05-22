"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

type Props = {
  //   onLocationChange: (location: any) => void;
  location: string | null;
};

const SearchBar = (props: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(props.location ?? "");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      router.replace(
        value === "" ? "/" : `/?location=${encodeURIComponent(value)}`
      );
    }, 300);
    return () => clearTimeout(debounceTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div data-testid="search-bar">
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_PLACES_KEY}
        selectProps={{
          onChange: (location) => {
            setValue(location?.value.place_id);
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
