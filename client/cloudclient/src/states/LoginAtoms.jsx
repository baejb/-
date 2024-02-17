import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false, // 기본값은 로그인되어 있지 않음
});

export const userIdState = atom({
    key: 'userIdState',
    default: null, // Default value for the Kakao ID
  });