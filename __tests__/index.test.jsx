import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import SearchBar from "../app/components/SearchBar";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
  }),
}));

describe("SearchBar", () => {
  it("renders a searchbar", () => {
    render(<SearchBar />);
    const searchBar = screen.getByTestId("search-bar");
    expect(searchBar).toBeInTheDocument();
  });
});
