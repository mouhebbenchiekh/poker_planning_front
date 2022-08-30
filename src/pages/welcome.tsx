const WelcomePage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center items-center h-1/2 gap-4'>
      <h1 className='font-bold text-3xl'>
        Scrum Poker for agile development teams
      </h1>
      <p className='text-base'>
        Have fun while being productive with our simple and complete tool.
      </p>
      <button className='group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md bg-white border-indigo-600 text-indigo-600 hover:bg-slate-200 mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
        Start new room
      </button>
    </div>
  );
};

export default WelcomePage;
