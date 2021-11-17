import { DonatedBook, User } from '.prisma/client';
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

  async send(sender: User, to: User, bookSended: DonatedBook, description: string, senderContact: string) {
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = '📚 Uma pessoa se interessou em adquirir o livro que você está doando! 📚';
    sendSmtpEmail.htmlContent =
      `<html>
        <body>
          <div style="width: 100%; height: 100%; font-family: monospace">
            <div style="display: flex; justify-content: center; background-color: #C03A2B; color: white">
              <h1>Desapega Livro<h1>
            </div>
            
            <div style="padding: 60px"> 
              <div style="margin-bottom: 30px; font-size: 18px; text-align: center">
                O usuário(a) <b>${sender.name}</b> se candidatou para receber o seu
                livro <b style="color: #C03A2B">${bookSended.title}</b>!
              </div>
          
              <div style="margin-bottom: 10px; font-size: 16px">Veja o que ele escreveu:</div>
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 30px">${description}</div>
        
              <div>
                Contato: ${senderContact}
              </div>
            </div>
          </div>
        </body>
      </html>`;
    sendSmtpEmail.sender = { name: process.env.FROM_EMAIL_NAME, email: process.env.FROM_EMAIL };
    sendSmtpEmail.to = [{ email: to.email, name: to.name }];
    sendSmtpEmail.replyTo = { email: to.email };

    const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('response email: ', response);
  }
}