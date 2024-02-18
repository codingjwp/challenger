import {QueryClient} from '@tanstack/react-query';
import {getWebStorage} from './login';
import {ReturnType, MessageType} from 'GlobalCommonTypes';

export const queryClient = new QueryClient();

type SignBodyTypes = {
  nick: string;
  password: string;
  confirm?: string;
};

type SignupOrSignin = {
  path: string;
  body: SignBodyTypes;
};

/**
 * 로그인 및 회원가입 REST API 함수
 * @param path signup, signin 두가지
 * @param body 객체 nick, password 및 signup때 confirm 추가
 * @returns signup은 Object {status, message} signin은 Object {userId, limitData}
 */
export const fetchSignupOrSignin = async ({path, body}: SignupOrSignin) => {
  const url = (import.meta.env.SERVER_URL || 'http://localhost:8080') + path;
  const bodyData: SignBodyTypes = {
    nick: body.nick,
    password: body.password,
  };
  if (path === '/signup') {
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

type ImageList = {
  list: {
    id: string;
    imgSrc: string;
    imgAlt: string;
    type: string;
  }[];
};

/**
 * 챌린지 타입 이미지를 받는 함수
 * @returns id: id값 imgSrc: 이미지주소, imgAlt:이미지설명 type: 이미지타입
 */
export const featchChallengeImage = async () => {
  const url =
    (import.meta.env.SERVER_URL || 'http://localhost:8080') + '/v2/image';
  const res = await fetch(url);
  if (!res.ok) {
    const info = await res.json();
    const error: MessageType = {
      status: info.status,
      message: info.message,
    };
    throw error;
  }
  const data = (await res.json()) as ImageList;
  return {list: data.list};
};

type EditBodyTypes = {
  userId?: string;
  postId?: string;
  title: string;
  imgSrc: string;
  description: string;
  startDate: string;
  endDate: string;
};

type EditPostTypes = {
  path: string;
  body: EditBodyTypes;
};

/**
 * 챌린지 생성 및 수정 함수
 * @param 객체 {path: 주소 body: 넘기는 데이터}
 * @returns status http 응답코드 message: 응답 메세지
 */
export const featchEditChallenge = async ({path, body}: EditPostTypes) => {
  const url = (import.meta.env.SERVER_URL || 'http://localhost:8080') + path;
  const userInfo = getWebStorage();
  const newBody = {
    ...body,
    userId: userInfo?.userId,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({...newBody}),
  });
  if (!res.ok) {
    const info = await res.json();
    const error: MessageType = {
      status: info.status,
      message: info.message,
    };
    throw error;
  }
  const data = (await res.json()) as MessageType;
  return data;
};

type GetChallengeType = {
  challengeLength: number;
  sucessLength: number;
  failureLength: number;
  posts: EditBodyTypes[];
};

/**
 * 챌린지 상태에 따른 목록가져오기
 * @param status 챌린지 상태 challenge, sucess, failure
 * @returns 챌릭지 갯수 및 게시글모음 challengeLength, sucessLength, failureLength, posts
 */
export const fetchGetChallenge = async (status: string) => {
  const userInfo = getWebStorage();
  const url =
    (import.meta.env.SERVER_URL || 'http://localhost:8080') +
    '/challenge' +
    `?status=${status}&userId=${userInfo?.userId}`;
  const res = await fetch(url);
  if (!res.ok) {
    const info = await res.json();
    const error: MessageType = {
      status: info.status,
      message: info.message,
    };
    throw error;
  }
  const data = (await res.json()) as GetChallengeType;
  return data;
};

/**
 * 챌린지 성공, 실패 관련 fetch 함수
 * @param postId 포스터 id
 * @param status 상태값
 * @returns 성공 메세지, 에러 메세지
 */
export const featchPutChallenge = async (postId: string, status: string) => {
  const userInfo = getWebStorage();
  const url =
    (import.meta.env.SERVER_URL || 'http://localhost:8080') + '/challenge';
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userInfo!.userId,
      postId,
      status,
    }),
  });

  if (!res.ok) {
    const info = await res.json();
    const error: MessageType = {
      status: info.status,
      message: info.message,
    };
    throw error;
  }

  const data = (await res.json()) as MessageType;
  return data;
};

/**
 * post 삭제 부분
 * @param postId 포스트 ID
 * @returns 성공 메세지, 에러 메세지
 */
export const featchDeleteChallenge = async (postId: string) => {
  const userInfo = getWebStorage();
  const url =
    (import.meta.env.SERVER_URL || 'http://localhost:8080') +
    '/challenge/' +
    postId;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userInfo!.userId,
    }),
  });

  if (!res.ok) {
    const info = await res.json();
    const error: MessageType = {
      status: info.status,
      message: info.message,
    };
    throw error;
  }

  const data = (await res.json()) as MessageType;
  return data;
};
