export const ResponseMock = {
  cookie: jest.fn().mockReturnValue(null),
  json: jest.fn().mockReturnValue({ ok: true }),
};
