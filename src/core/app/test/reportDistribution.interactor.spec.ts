import 'ts-jest';
import ReportDistributionInteractor from '../transactions/interactors/reportDistribution.interactor';

describe('TransactionCategoryInteractor tests', () => {
  it('check methods existance', () => {
    const service = new ReportDistributionInteractor(
      null,
      null,
      null,
      null,
      null,
    );
    expect(service.subscribe).toBeDefined();
    expect(service.unsubscribe).toBeDefined();
    expect(service.send).toBeDefined();
  });
});
