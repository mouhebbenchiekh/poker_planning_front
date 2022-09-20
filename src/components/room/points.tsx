import React from 'react';
import { RoomType } from '../../types/room';

const PointsBar: React.FC<{
  type: RoomType;
  setPoint: (val: string) => void;
}> = ({ type, setPoint }) => {
  const Fibonachi = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];
  const Regular = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '?'];
  const points = type === RoomType.fibonachi ? Fibonachi : Regular;
  return (
    <div className='flex flex-row justify-center items-center flex-wrap gap-3 w-full h-max absolute bottom-1'>
      {points.map((ele, index) => (
        <button
          key={index}
          className='px-2 py-4 w-max h-max rounded-md border-2 border-slate-800 bg-slate-100 text-cyan-500 text-lg font-semibold '
          onClick={() => {
            setPoint(ele.toString());
          }}
        >
          {ele}
        </button>
      ))}
    </div>
  );
};
export default PointsBar;
