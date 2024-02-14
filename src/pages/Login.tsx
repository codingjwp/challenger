import {FormEvent, useRef, useState} from 'react';
import Button from '../components/Button';
import {autoLogout, setLogin, requiredLoginCheck} from '../util/login';
import {redirect, useNavigate} from 'react-router-dom';
import Input from '../components/Input';

const Login = () => {
  const nickRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    const nick = nickRef.current?.value;
    if (nick === '' || !nick) {
      return;
    }
    const {error, message} = setLogin(nick);
    if (error) {
      setErrorMsg(message);
      return;
    }
    navigate('/challenge');
  };

  const handleRequiredBlur = () => {
    const nick = nickRef.current?.value;
    if (!nick || nick === '') {
      setErrorMsg('');
      return;
    }
    const check = requiredLoginCheck(nick);
    if (!check) {
      setErrorMsg('빈 공간과 "_"를 제외한 특수문자는 입력을 못합니다.');
      return;
    }
    setErrorMsg('');
  };
  return (
    <main className='flex pt-12 h-screen'>
      <div className='bg-rose-300 w-[30rem] p-4 font-sans border-4 border-rose-400 rounded-lg m-auto'>
        <h2 className='text-2xl font-bold text-left uppercase tracking-widest'>
          Login
        </h2>
        <p className='py-4'>닉네임을 입력해 주세요.</p>
        <form onSubmit={handleLogin}>
          <Input
            type='text'
            ref={nickRef}
            id='nickname'
            content='닉네임'
            autoFocus
            className={`w-full py-2 rounded-md px-2 ${errorMsg !== '' && 'border-2 border-red-500'}`}
            onBlur={handleRequiredBlur}
          />
          {errorMsg !== '' && (
            <p className='text-sm text-start text-red-500 py-1 font-bold'>
              {errorMsg}
            </p>
          )}
          <div className='flex justify-end mt-4'>
            <Button type='button' mode='fill'>
              등 록
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const isLogin = autoLogout();
  if (!isLogin) {
    return null;
  }
  return redirect('/challenge');
};
