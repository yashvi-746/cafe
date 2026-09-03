const MiniBarChart = ({ data }) => {
  const max = Math.max(...data.map(d=>d.v));
  return (
    <div className="flex items-end gap-3 h-40">
      {data.map(d=>(
        <div key={d.d} className="flex flex-col items-center gap-2 grow">
          <div className="w-full nb-bg-espresso" style={{ height: `${(d.v/max)*120}px` }} />
          <span className="text-[10px] nb-text-fade">{d.d}</span>
        </div>
      ))}
    </div>
  );
};


export default MiniBarChart;
