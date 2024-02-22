type ErrorContainerProps = {
  message: string;
};

const ErrorContainer = ({message}: ErrorContainerProps) => {
  return (
    <div className='flex flex-col gap-2 rounded mt-3 bg-rose-100'>
      <p className='text-rose-500 text-start px-2 mt-2 font-bold'>ERROR</p>
      <p className='text-rose-500 text-start px-2 py-4'>{message} </p>
    </div>
  );
};

export default ErrorContainer;
