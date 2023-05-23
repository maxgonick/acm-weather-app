"use client";
//Client Component as it relies on user interacivity
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const SearchBar = () => {
  const router = useRouter();
  //holds data of locationID for searched area
  const [value, setValue] = useState("");

  useEffect(() => {
    //Prevent spamming router reloads
    const debounceTimeout = setTimeout(() => {
      //updates URL with new search params to update SSR component
      router.replace(
        value === "" ? "/" : `/?location=${encodeURIComponent(value)}`
      );
    }, 300);
    //Cleanup to reset timer for next useEffect trigger
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
          placeholder: "Search for Places...", // Set the placeholder text here
        }}
      />
    </div>
  );
};

export default SearchBar;
