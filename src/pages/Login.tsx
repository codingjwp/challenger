import Button from '../components/Button';

const Login = () => {
  return (
    <main className='flex pt-12 h-screen'>
      <div className='bg-rose-300 w-[30rem] max-h-56 p-4 font-sans border-4 border-rose-400 rounded-lg m-auto'>
        <h2 className='text-2xl font-bold text-left uppercase tracking-widest'>
          Login
        </h2>
        <p className='py-4'>닉네임을 입력해 주세요.</p>
        <input
          className='w-full py-2 rounded-md px-2'
          autoFocus
          type='text'
          placeholder='닉네임'
        />
        <div className='flex justify-end mt-4'>
          <Button type='button' mode='fill'>
            등 록
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Login;
