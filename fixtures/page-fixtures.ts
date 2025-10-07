import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { Homepage } from '../pages/Homepage';
import { HospitalDetailPage } from '../pages/Hospital-details';
import { LabTestPage } from '../pages/Labtests';
import { CorporateWellnessValidDataPage } from '../pages/cooperatewellness';
import { CooperateWellnessInvalidDataPage  } from '../pages/invalidwellness';


export class PageFixture {
  readonly page: Page;
  readonly basePage: BasePage;
  readonly homepage: Homepage;
  readonly hospitaldetails: HospitalDetailPage;
  readonly labtest: LabTestPage;
  readonly cooperateWellnessPage: CorporateWellnessValidDataPage;
  readonly invalidWellnessPage: CooperateWellnessInvalidDataPage ;
 
 // readonly invalidWellnessPage: CooperateWellnessInvalidDataPage ;

  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.homepage = new Homepage(page);
    this.hospitaldetails = new HospitalDetailPage(page);
    this.labtest = new LabTestPage(page);
    //this.cooperateWellnessPage = new  CorporateWellnessValidDataPage(page);
    this.invalidWellnessPage = new CooperateWellnessInvalidDataPage(page);
  }
 
  get base(): Page {
    return this.page;
  }
}