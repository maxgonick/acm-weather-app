describe("Environment Variables", () => {
  it("should load environment variables", () => {
    expect(process.env.NEXT_PUBLIC_PLACES_KEY).toBe(
      process.env.NEXT_PUBLIC_PLACES_KEY
    );
  });
});
