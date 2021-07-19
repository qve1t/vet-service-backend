export const AuthServiceMock = {
  login: jest.fn().mockResolvedValue({ ok: true }),
  logout: jest.fn().mockResolvedValue({ ok: true }),
};
