import { Link } from 'react-router-dom';
import { IRoom } from '../../types/room';

export default function ListItem(props: Partial<IRoom>) {
  return (
    <Link to={props._id || '#'} replace={true}>
      <article className='flex items-start space-x-6 p-6 hover:cursor-pointer bg-slate-200'>
        <div className='min-w-0 relative flex-auto'>
          <h2 className='font-semibold text-indigo-600 truncate pr-20'>
            Room: {props.name}
          </h2>
          <dl className='mt-2 flex flex-wrap text-sm leading-6 font-medium'>
            <div className='ml-2'>
              <dt className='sr-only'>Type</dt>
              <dd>Type: {props.type}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Link>
  );
}
