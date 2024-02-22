import {FormEvent} from 'react';
import {redirect, useLocation, useNavigate} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {motion} from 'framer-motion';

import Input from '@ui/Input';
import Button from '@ui/Button';
import {LoadingSvg} from '@ui/SvgItem';

import {fetchSignupOrSignin, queryClient} from '@util/http';
import {setWebStorage, limitCheckLogin} from '@util/login';
import {ReturnType} from 'GlobalCommonTypes';

type InputGroupsProps = {
  isSignup: boolean;
};

const InputGroups = ({isSignup}: InputGroupsProps) => {
  return (
    <>
      <Input
        key={`${isSignup}`}
        type='text'
        id='nick'
        autoFocus
        autoComplete='username'
        content='닉네임'
        className={`w-full py-2 rounded-md px-2 mb-4`}
      />
      <Input
        type='password'
        id='password'
        content='비밀번호'
        autoComplete={`${isSignup ? 'new-password' : 'current-password'}`}
        className={`w-full py-2 rounded-md px-2 mb-4`}
      />
      {isSignup && (
        <>
          <Input
            type='password'
            id='confirm'
            content='비밀번호 재확인'
            autoComplete='current-password'
            className={`w-full py-2 rounded-md px-2 mb-4`}
          />
        </>
      )}
    </>
  );
};

const Login = () => {
  const location = useLocation();
  const isSignup = location.pathname === '/signup';
  const navigate = useNavigate();
  const {mutate, isPending, reset, isError, error} = useMutation({
    mutationFn: fetchSignupOrSignin,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['views', 'challenge']});
      const path = isSignup ? '/signin' : '/challenge';
      if (!isSignup) {
        const {userId, limitData} = data as ReturnType;
        setWebStorage(userId, limitData);
      }
      navigate(path);
    },
  });

  const handleSubmitSigninToSignUp = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const {nick, password, confirm} = Object.fromEntries(formData);
    const path = location.pathname;
    const body = {
      nick: nick as string,
      password: password as string,
      confirm: confirm as string,
    };
    (event.target as HTMLFormElement).reset();
    mutate({path, body});
  };

  const handleMoveSign = () => {
    const form = document.getElementById('login_event') as HTMLFormElement;
    const path = isSignup ? '/signin' : '/signup';
    form.reset();
    reset();
    navigate(path);
  };
  return (
    <main className='flex pt-12 h-screen'>
      <motion.div
        layout
        className='bg-rose-300 w-[30rem] p-4 font-sans border-4 border-rose-400 rounded-lg m-auto'
      >
        <h2 className='text-2xl font-bold text-left uppercase tracking-widest'>
          {isSignup ? 'Signup' : 'Signin'}
        </h2>
        <p className='py-4'>닉네임과 비밀번호를 입력해 주세요.</p>
        <form id='login_event' onSubmit={handleSubmitSigninToSignUp}>
          <InputGroups isSignup={isSignup} />
          {isError && (
            <p className='text-sm text-red-600 mb-2 font-bold'>
              {error.message}
            </p>
          )}
          <div className='flex justify-end'>
            <Button
              type='button'
              mode='text'
              disabled={isPending}
              onClick={handleMoveSign}
            >
              {isSignup ? '로그인 화면' : '회원가입'}
            </Button>
            <Button
              type='submit'
              mode='fill'
              disabled={isPending}
              className='flex gap-1 bg-indigo-400 hover:bg-indigo-500'
            >
              {isPending && <LoadingSvg isAnimation={isPending} />}
              {isSignup ? '유저 생성' : '로그인'}
            </Button>
          </div>
        </form>
      </motion.div>
    </main>
  );
};

export default Login;

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const path = limitCheckLogin();
  if (path) return redirect(path);
  return path;
};
