const { test, expect } = require("@playwright/test");

export const logIntoAdminPanel = async (page) => {
  await page.goto(`http://localhost:${process.env.PORT}/admin`);
  await expect(page).toHaveTitle("Login - Admin Panel");

  await page.getByLabel("Email Address:").fill("admin@iec.org.pk");
  await page.getByLabel("Password:").fill("examplepassword");
  await page.getByRole("button", { name: "Log In" }).click();
  return expect(page).toHaveTitle("Home - Admin Panel");
};

export const goToApplicationsTab = async (page) => {
  await page.getByRole("link", { name: /Applications/ }).click();
  return expect(page).toHaveTitle("Cohort Applications - Admin Panel");
};