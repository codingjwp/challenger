import {QueryClient} from '@tanstack/react-query';
import {getWebStorage} from './login';
import {ReturnType, MessageType, ImageListTypes} from 'GlobalCommonTypes';

export const queryClient = new QueryClient();

/**
 * url 주소 반환 함수
 * @param path Api 경로
 * @returns url 주소
 */
const getUrl = (path?: string) => {
  const url =
    (import.meta.env.SERVER_URL || 'http://localhost:8080') + (path || '');
  return url;
};

/**
 * fetch option 반환 함수
 * @param method http method
 * @param body 보내는 body 값
 * @returns
 */
const getFetchOptions = (method: string, body: string) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };
  return options;
};

/**
 * Response에서 ok가 false일 경우 에러 핸들
 * @param res Response 값
 */
const handleFetchError = async (res: Response) => {
  if (!res.ok) {
    const info = await res.json();
    const error: MessageType = {
      status: info.status,
      message: info.message,
    };
    throw error;
  }
};

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
  const url = getUrl(path);
  const bodyData: SignBodyTypes = {
    nick: body.nick,
    password: body.password,
  };
  if (path === '/signup') {
    bodyData.confirm = body.confirm!;
  }
  const options = getFetchOptions('POST', JSON.stringify({...bodyData}));
  const res = await fetch(url, options);
  await handleFetchError(res);
  const data = (await res.json()) as ReturnType | MessageType;
  return data;
};

type ImageGroup = {
  list: ImageListTypes[];
};

/**
 * 챌린지 타입 이미지를 받는 함수
 * @returns id: id값 imgSrc: 이미지주소, imgAlt:이미지설명 type: 이미지타입
 */
export const featchChallengeImage = async () => {
  const url = getUrl('/v2/image');
  const res = await fetch(url);
  await handleFetchError(res);
  const data = (await res.json()) as ImageGroup;
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
  const url = getUrl(path);
  const userInfo = getWebStorage();
  const newBody = {
    ...body,
    userId: userInfo?.userId,
  };
  const options = getFetchOptions('POST', JSON.stringify({...newBody}));
  const res = await fetch(url, options);
  await handleFetchError(res);
  const data = (await res.json()) as MessageType;
  return data;
};

type GetChallengeType = {
  challengeLength: number;
  successLength: number;
  failureLength: number;
  posts: EditBodyTypes[];
};

/**
 * 챌린지 상태에 따른 목록가져오기
 * @param status 챌린지 상태 challenge, success, failure
 * @returns 챌릭지 갯수 및 게시글모음 challengeLength, successLength, failureLength, posts
 */
export const fetchGetChallenge = async (status: string) => {
  const userInfo = getWebStorage();
  const url = getUrl(
    '/challenge' + `?status=${status}&userId=${userInfo?.userId}`,
  );
  const res = await fetch(url);
  await handleFetchError(res);
  const data = (await res.json()) as GetChallengeType;
  return data;
};

type PutChallengeType = {
  postId: string;
  status: string;
};

/**
 * 챌린지 성공, 실패 관련 fetch 함수
 * @param postId 포스터 id
 * @param status 상태값
 * @returns 성공 메세지, 에러 메세지
 */
export const featchPutChallenge = async ({
  postId,
  status,
}: PutChallengeType) => {
  const userInfo = getWebStorage();
  const url = getUrl('/challenge');
  const options = getFetchOptions(
    'PUT',
    JSON.stringify({userId: userInfo!.userId, postId, status}),
  );
  const res = await fetch(url, options);
  await handleFetchError(res);
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
  const url = getUrl('/challenge/' + postId);
  const options = getFetchOptions(
    'DELETE',
    JSON.stringify({userId: userInfo!.userId}),
  );
  const res = await fetch(url, options);
  await handleFetchError(res);
  const data = (await res.json()) as MessageType;
  return data;
};

type DashboardTypes = {
  nick: string;
  typeList: ImageListTypes[];
  lengthList: {
    userChallengeLength: number;
    userSuccessLength: number;
    userFailureLength: number;
  };
};

export const featchGetDashboard = async () => {
  const userInfo = getWebStorage();
  const url = getUrl(`/dashboard/${userInfo!.userId}`);
  const res = await fetch(url);
  await handleFetchError(res);
  const data = (await res.json()) as DashboardTypes;
  return data;
};
