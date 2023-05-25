type Props = {
  UVIndex: number;
  mph: number;
  sunrise: string;
  sunset: string;
};

const UVIndex = ({ index }) => {
  return (
    <div className="flex flex-col py-4 gap-2 border bg-white rounded-xl max-w-[75%] h-[150px] justify-between items-center">
      <div>UV Index</div>
      <div
        className="radial-progress"
        style={{ "--value": (index / 11.2) * 100 }}
      >
        {index}
      </div>
    </div>
  );
};

const WindStatus = ({ mph }) => {
  return (
    <div className=" border bg-white rounded-xl py-4 px-1 max-w-[75%] h-[150px] flex flex-col justify-between items-center">
      <h2 className="text-slate-400 text-sm">Wind Status</h2>
      <h1 className="text-2xl">{mph} mph</h1>
    </div>
  );
};

const HighlightCards = (props: Props) => {
  return (
    <div className="grid grid-cols-3 gap-y-5 my-5">
      <UVIndex index={props.UVIndex} />
      <WindStatus mph={props.mph} />
      <WindStatus mph={props.mph} />
      <WindStatus mph={props.mph} />
      <WindStatus mph={props.mph} />
      <WindStatus mph={props.mph} />
    </div>
  );
};

export default HighlightCards;
