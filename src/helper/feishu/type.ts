/**
 * @description: 用于接收用户或群组的类型
 */
export enum RECEIVE_TYPE {
  open_id,
  user_id,
  union_id,
  email,
  chat_id
}

export enum MSG_TYPE {
  text,
  post,
  image,
  file,
  audio,
  media,
  sticker,
  interactive,
  share_chat,
  share_user
}

export type MESSAGE_PARAMS = {
  receive_id: string;
  content: string;
  msg_type: MSG_TYPE;
};
