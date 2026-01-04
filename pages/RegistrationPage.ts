import { Page, Locator, expect } from "@playwright/test";

export class RegistrationPage {

  private readonly page: Page;
  private readonly txtFirstName;
  private readonly txtLastName;
  private readonly txtEmail;
  private readonly txtTelephone;
  private readonly txtPassword;
  private readonly txtPasswordConfirm;
  private readonly chkPrivacyPolicy;
  private readonly btnContinue;
  private readonly msgConfirmation;


  constructor(page: Page) {
    this.page = page;
    this.txtFirstName = page.getByRole('textbox', { name: 'First Name' });
    this.txtLastName = page.getByRole('textbox', { name: 'Last Name' });
    this.txtEmail = page.getByRole('textbox', { name: 'E-Mail' });
    this.txtTelephone = page.getByRole('textbox', { name: 'Telephone' });
    this.txtPassword = page.locator('#input-password');
    this.txtPasswordConfirm = page.getByRole('textbox', { name: 'Password Confirm' });
    this.chkPrivacyPolicy = page.getByRole('checkbox');
    this.btnContinue = page.locator('input.btn.btn-primary');
    this.msgConfirmation = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
  }


  //Actions methods

  async setFirstName(firstName: string) {
    await this.txtFirstName.fill(firstName);
  }
  async setLastName(lastName: string) {
    await this.txtLastName.fill(lastName);
  }
  async setEmail(email: string) {
    await this.txtEmail.fill(email);
  }
  async setTelephone(telephone: string) {
    await this.txtTelephone.fill(telephone);
  }
  async setPassword(password: string) {
    await this.txtPassword.fill(password);
  }
  async setPasswordConfirm(passwordConfirm: string) {
    await this.txtPasswordConfirm.fill(passwordConfirm);
  }
  async checkPrivacyPolicy() {
    await this.chkPrivacyPolicy.check();
  }
  async clickContinue() {
    await this.btnContinue.click();
  }

  async getConfirmationMessage(): Promise<string> {
    return await this.msgConfirmation.textContent() as string;
  }



  async completeRegistration(userData: { firstName: string, lastName: string, email: string, telephone: string, password: string }) {
    await this.setFirstName(userData.firstName);
    await this.setLastName(userData.lastName);
    await this.setEmail(userData.email);
    await this.setTelephone(userData.telephone);
    await this.setPassword(userData.password);
    await this.setPasswordConfirm(userData.password);
    await this.checkPrivacyPolicy();
    await this.clickContinue();
    await expect(this.msgConfirmation).toBeVisible();

  }
}


