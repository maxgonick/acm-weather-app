import Image from "next/image";

type WeekCardProps = {
  image: number;
  high: number;
  low: number;
  day: string;
};

const WeekCard = ({ image, high, low, day }: WeekCardProps) => {
  const getImage = (weathercode: number) => {
    if (weathercode == 0 || weathercode == 1) {
      return (
        <Image alt="weather" src="clear-day.svg" width={100} height={100} />
      );
    } else if (weathercode == 2) {
      return <Image alt="weather" src="cloudy.svg" width={100} height={100} />;
    } else if (weathercode == 3) {
      return (
        <Image alt="weather" src="overcast.svg" width={100} height={100} />
      );
    } else if (weathercode == 45 || weathercode == 48) {
      return <Image alt="weather" src="fog.svg" width={100} height={100} />;
    } else if (
      (weathercode >= 51 && weathercode <= 67) ||
      (weathercode >= 80 && weathercode <= 86)
    ) {
      return <Image alt="weather" src="rain.svg" width={100} height={100} />;
    } else if (weathercode >= 71 && weathercode <= 77) {
      return <Image alt="weather" src="snow.svg" width={100} height={100} />;
    } else if (weathercode >= 95) {
      return (
        <Image alt="weather" src="thunderstorms.svg" width={100} height={100} />
      );
    } else {
      return (
        <Image alt="weather" src="clear-day.svg" width={100} height={100} />
      );
    }
  };

  const toDay = (date: string): string => {
    console.log(date);
    console.log("2023-" + date);
    const weekday = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    const fullDate = new Date("2023-" + date + "T00:00:00Z"); // Specify UTC time zone
    const day = fullDate.getDay();
    return weekday[day];
  };

  return (
    <div className="flex flex-col items-center py-2 px-0.5 bg-white rounded-xl flex-1 max-w-xs">
      <h2 className="text-lg text-slate-600">{toDay(day)}</h2>
      <div>{getImage(image)}</div>
      <div className="text-center mt-2 text-lg ">
        <span className="text-slate-500">{high}&deg;</span>&nbsp;
        <span className="text-slate-400">{low}&deg;</span>
      </div>
    </div>
  );
};

type WeeklyProps = {
  highs: Array<number>;
  lows: Array<number>;
  images: Array<number>;
  days: Array<string>;
};

const WeeklyCards = ({ highs, lows, images, days }: WeeklyProps) => {
  return (
    <div className="flex justify-between flex-wrap gap-[0.5rem]">
      {highs.map((high, index) => (
        <WeekCard
          key={index}
          image={images[index]}
          high={high}
          low={lows[index]}
          day={days[index].slice(-5)}
        />
      ))}
    </div>
  );
};

export default WeeklyCards;
