import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { HomePage } from '../pages/Homepage';
import { HospitalDetailPage} from '../pages/Hospital-details';
import { LabTestPage } from '../pages/Labtests';
import { CorporateWellnessValidDataPage } from '../pages/cooperatewellness';
import { CorporateWellnessInvalidDataPage  } from '../pages/invalidwellness';
 
export class PageFixture {
  readonly page: Page;
  readonly basePage: BasePage;
  readonly homepage: HomePage;
  readonly hospitaldetails: HospitalDetailPage;
  readonly labtest: LabTestPage;
  readonly cooperateWellnessPage: CorporateWellnessValidDataPage;
  readonly invalidWellnessPage: CorporateWellnessInvalidDataPage ;
 
  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.homepage = new HomePage(page);
    this.hospitaldetails = new HospitalDetailPage(page);
    
  }
 
  get base(): Page {
    return this.page;
  }
}