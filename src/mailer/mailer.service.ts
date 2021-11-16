import { Injectable } from '@nestjs/common';
const SibApiV3Sdk = require('sib-api-v3-sdk');

@Injectable()
export class MailerService {
  private apiInstance: any;

  constructor() {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  async send() {
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = '📚 Uma pessoa se interessou em adquirir o livro que você está doando! 📚';
    sendSmtpEmail.htmlContent =
      '<html><body><h1>Desapega Livro teste email</h1></body></html>';
    sendSmtpEmail.sender = { name: process.env.FROM_EMAIL_NAME, email: process.env.FROM_EMAIL };
    sendSmtpEmail.to = [{ email: 'antonioribdev@gmail.com', name: 'Antonio Ribeiro' }];
    sendSmtpEmail.replyTo = { email: 'antonioribdev@gmail.com' };
    sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' };

    const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('response email: ', response);
  }
}