describe("Environment Variables", () => {
  it("should load environment variables", () => {
    expect(process.env.NEXT_PUBLIC_PLACES_KEY).toBe(
      "AIzaSyDi4DbgZ6ONKuoINMQcK29NzcA4UlACaWI"
    );
  });
});
