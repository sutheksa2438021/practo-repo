import { chromium, expect, test as base } from '@playwright/test';
import { CorporateWellnessValidDataPage } from '../pages/cooperatewellness';
import {  readCSVdata } from '../utils/readCSV';

type TestData = { phone_number: string };
const idata = readCSVdata('validtestdata.csv') as TestData[];

base('verify successful app download link SMS delivery', async () => {
  // Launch Chromium with automation detection disabled
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const downloadLinkPage = new CorporateWellnessValidDataPage(page);

  await downloadLinkPage.navigate();
  await downloadLinkPage.sendSms(idata[0].phone_number);
  await downloadLinkPage.verifySuccessMessage();

  console.log("The app download link was sent successfully via SMS.");

  await browser.close();
});
