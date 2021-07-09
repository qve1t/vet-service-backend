export const VisitServiceMock = {
  getVisitsForDay: jest.fn().mockResolvedValue(null),
  getVisitDetails: jest.fn().mockResolvedValue(null),
  registerVisit: jest.fn().mockResolvedValue(null),
  updateVisit: jest.fn().mockResolvedValue(null),
  deleteVisit: jest.fn().mockResolvedValue(null),
};
