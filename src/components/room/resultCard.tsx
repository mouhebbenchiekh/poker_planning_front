import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { ISocketUser } from '../../types/socket';
import './resultCard.css';

interface Props extends ISocketUser {
  flipped: boolean;
  me: boolean;
}

const ResultCard: FC<Props> = (props) => {
  const [flip, setFlip] = useState(props.flipped);
  useEffect(() => {
    setFlip(props.flipped);
  }, [props]);
  return (
    <div className='flex flex-col gap-2 justify-center items-center '>
      <div
        className={clsx('card', flip && 'is_flipped')}
        onClick={() => {
          if (props.me) setFlip((prev) => !prev);
        }}
      >
        <div
          className={clsx(
            'card__face card__face--front bg-slate-800',
            props.value && 'ring-2 ring-offset-2 ring-indigo-500'
          )}
        ></div>
        <div className='card__face card__face--back bg-slate-300 text-cyan-500'>
          {props.value}
        </div>
      </div>
      <p className='font-semibold text-sm text-slate-900 uppercase'>
        {props.username}
      </p>
    </div>
  );
};

export default ResultCard;
