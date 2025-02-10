export default function LoadingOverlay() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='w-10 h-10 border-4 border-white border-t-blue-500 rounded-full animate-spin'></div>
    </div>
  );
}
