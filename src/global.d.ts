declare module 'GlobalCommonTypes' {
  export type ReturnType = {
    userId: string;
    limitData: number;
  };
  export type MessageType = {
    status: number;
    message: string;
  };
  export type PostViewTypes = {
    postId?: string;
    title?: string;
    imgSrc?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  };
  export type ImageListTypes = {
    id: string;
    imgSrc: string;
    imgAlt: string;
    type: string;
    success?: number;
    failure?: number;
  };
}
