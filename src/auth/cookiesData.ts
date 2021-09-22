export const COOKIES_NAMES = {
  JWT: 'jwt',
  REFRESH: 'refreshToken',
};

export const COOKIES_OPTIONS = {
  secure: false,
  domain: 'localhost',
  httpOnly: true,
};

export const COOKIE_EXPIRE_TIME = {
  JWT: 60 * 60 * 24,
  REFRESH: 60 * 60 * 24 * 7,
};
