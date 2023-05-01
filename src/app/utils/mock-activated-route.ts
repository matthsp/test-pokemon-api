import { Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class MockActivatedRoute {
  private innerTestParams?: Params;
  private subject: BehaviorSubject<Params> = new BehaviorSubject(
    this.testParams
  );

  public paramMap;
  public queryParams;

  constructor(params?: Params) {
    this.paramMap = this.subject.asObservable();
    this.queryParams = this.subject.asObservable();

    if (params) {
      this.testParams = params;
    } else {
      this.testParams = {};
    }
  }

  set testParams(params: Params) {
    this.innerTestParams = params;
    this.subject.next(params);
  }

  get snapshot() {
    return { params: this.testParams, queryParams: this.testParams };
  }
}
