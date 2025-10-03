import { test, expect } from '@playwright/test';
import { LabTestPage } from '../pages/Labtests';

test.describe('Lab Test Booking Flow', () => {
  let labTestPage: LabTestPage;

  test.beforeEach(async ({ page }) => {
    labTestPage = new LabTestPage(page);
   
  });

  test('Verify lab test page loads and displays available tests', async ({ page }) => {
    
  });
});