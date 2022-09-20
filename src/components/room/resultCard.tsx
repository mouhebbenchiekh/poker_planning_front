import clsx from 'clsx';
import { FC } from 'react';
import { ISocketUser } from '../../types/socket';
import './resultCard.css';

interface Props extends ISocketUser {
  flipped: boolean;
  me: boolean;
}

const ResultCard: FC<Props> = (props) => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <div
        className={`card ${props.flipped ? 'is_flipped' : ''}`}
        onClick={(e) => {
          if (props.me) e.currentTarget.classList.toggle('is_flipped');
        }}
      >
        <div className='card__face card__face--front bg-slate-800'></div>
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
