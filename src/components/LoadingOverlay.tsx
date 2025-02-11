const LoadingOverlay = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-10 z-10'>
      {/* <div className='w-10 h-10 border-4 border-white border-t-textBlue rounded-full animate-spin'></div> */}
      <div className='flex flex-row gap-2'>
        <div className='w-4 h-4 rounded-full bg-textBlue animate-bounce [animation-delay:.4s]'></div>
        <div className='w-4 h-4 rounded-full bg-textBlue animate-bounce [animation-delay:.1s]'></div>
        <div className='w-4 h-4 rounded-full bg-textBlue animate-bounce [animation-delay:.4s]'></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
