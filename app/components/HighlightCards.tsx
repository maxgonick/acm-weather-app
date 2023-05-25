import Image from "next/image";

type Props = {
  UVIndex: number;
  mph: number;
  sunrise: string;
  sunset: string;
};

type SunriseSunsetProps = {
  sunrise: string;
  sunset: string;
};

const SunriseSunset = ({ sunrise, sunset }: SunriseSunsetProps) => {
  const TwentyFourToTwelve = (input: string) => {
    const dt = new Date(input);
    let hours = dt.getHours();
    const AmOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = dt.getMinutes();
    const finalTime = hours + ":" + minutes + " " + AmOrPm;
    return finalTime;
  };

  return (
    <div className="border bg-white rounded-xl py-6 flex flex-col items-center max-w-[400px]">
      <div className="text-xl text-slate-600">Sunrise and Sunset</div>
      <div className="flex items-center ">
        <Image src="sunrise.svg" alt="uv index" height={80} width={100} />
        <div className="text-black text-xl">{TwentyFourToTwelve(sunrise)}</div>
      </div>
      <div className="flex items-center">
        <Image src="sunset.svg" alt="uv index" height={80} width={100} />
        <div className="text-black text-xl">{TwentyFourToTwelve(sunset)}</div>
      </div>
    </div>
  );
};

type UVIndexProps = {
  index: number;
};

const UVIndex = ({ index }: UVIndexProps) => {
  return (
    <div className="flex flex-col py-6 gap-2 border bg-white rounded-xl items-center max-w-[400px]">
      {/* <div className="flex items-center"> */}
      <div className="text-xl text-slate-600">UV Index </div>
      {/* <Image src="uv-index.svg" alt="uv index" height={30} width={30} /> */}
      {/* </div> */}
      <div
        className="radial-progress text-slate-700 text-2xl mt-6"
        style={{ "--value": (index / 11.2) * 100, "--size": "8rem" } as any}
      >
        {index}
      </div>
    </div>
  );
};

type WindStatusProps = {
  mph: number;
};

const WindStatus = ({ mph }: WindStatusProps) => {
  return (
    <div className="border bg-white rounded-xl py-6 px-1  flex flex-col justify-between items-center max-w-[400px]">
      <h2 className="text-xl text-slate-600">Wind Status</h2>
      <Image src="wind.svg" alt="wind" height={100} width={100} />
      <h1 className="text-2xl text-black">{mph} mph</h1>
    </div>
  );
};

const HighlightCards = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-y-5 my-5">
      <UVIndex index={props.UVIndex} />
      <SunriseSunset sunrise={props.sunrise} sunset={props.sunset} />
      <WindStatus mph={props.mph} />
    </div>
  );
};

export default HighlightCards;
