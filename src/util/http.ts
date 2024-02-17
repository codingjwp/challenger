import {QueryClient} from '@tanstack/react-query';
import {ReturnType, MessageType} from 'GlobalCommonTypes';

export const queryClient = new QueryClient();

type BodyTypes = {
  nick: string;
  password: string;
  confirm?: string;
};

type SignupOrSignin = {
  path: string;
  body: BodyTypes;
};

export const fetchSignupOrSignin = async ({path, body}: SignupOrSignin) => {
  const url = (import.meta.env.SERVER_URL || 'http://localhost:8080') + path;
  const bodyData: BodyTypes = {
    nick: body.nick,
    password: body.password,
  };
  if (path === 'signup') {
    bodyData.confirm = body.confirm!;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...bodyData}),
  });
  if (!res.ok) {
    const info = await res.json();
    const error: MessageType = {
      status: info.status,
      message: info.message,
    };
    throw error;
  }
  const data = (await res.json()) as ReturnType | MessageType;
  return data;
};
