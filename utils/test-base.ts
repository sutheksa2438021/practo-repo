import {test as baseTest,expect, Page} from '@playwright/test';
import { PageFixture } from '../fixtures/page-fixtures';
 
type Fixtures = {
 
    pages: PageFixture;
}
 
 
export const test = baseTest.extend<Fixtures>({
    pages: async ({page}, use) => {
        await use(new PageFixture(page));
    },
   
});
 
export {expect};