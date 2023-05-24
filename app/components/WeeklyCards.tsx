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
        <Image alt="weather" src="clear-day.svg" width={200} height={200} />
      );
    } else if (weathercode == 2) {
      return <Image alt="weather" src="cloudy.svg" width={200} height={200} />;
    } else if (weathercode == 3) {
      return (
        <Image alt="weather" src="overcast.svg" width={200} height={200} />
      );
    } else if (weathercode == 45 || weathercode == 48) {
      return <Image alt="weather" src="fog.svg" width={200} height={200} />;
    } else if (
      (weathercode >= 51 && weathercode <= 67) ||
      (weathercode >= 80 && weathercode <= 86)
    ) {
      return <Image alt="weather" src="rain.svg" width={200} height={200} />;
    } else if (weathercode >= 71 && weathercode <= 77) {
      return <Image alt="weather" src="snow.svg" width={200} height={200} />;
    } else if (weathercode >= 95) {
      return (
        <Image alt="weather" src="thunderstorm.svg" width={200} height={200} />
      );
    } else {
      return (
        <Image alt="weather" src="clear-day.svg" width={200} height={200} />
      );
    }
  };

  return (
    <div>
      <div>{getImage(image)}</div>
      <h2>{day}</h2>
      <div>
        <span>{high}</span>&nbsp;
        <span className="">{low}</span>
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
    <div className="flex justify-between">
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
