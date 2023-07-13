import { test, expect } from '@playwright/test';

test('create new file in My Files', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.frameLocator('iframe').getByLabel('My Files').getByTitle('/home/community/paquito').locator('div').click();
  await page.frameLocator('iframe').getByLabel('New File...').click();
  await page.frameLocator('iframe').getByLabel('Type file name. Press Enter to confirm or Escape to cancel.').fill('test_file.txt');
  await page.frameLocator('iframe').getByLabel('Type file name. Press Enter to confirm or Escape to cancel.').press('Enter');
  await page.frameLocator('iframe').getByRole('textbox', { name: 'test_file.txt' }).fill('testing');
  await page.frameLocator('iframe').getByRole('textbox', { name: 'test_file.txt' }).press('Control+s');
  await page.frameLocator('iframe').locator('#list_id_1_20').getByTitle('/home/community/paquito/test_file.txt').locator('div').click();
  await expect(page.locator('#list_id_1_20 a')).toBeTruthy()
});
