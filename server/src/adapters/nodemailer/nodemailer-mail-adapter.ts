import nodemailer from 'nodemailer';
import { MailAdapter, MailAdapterData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '41b8a2f46b696c',
    pass: '98f017d723fef7',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: MailAdapterData) {
    await transport.sendMail({
      from: 'Equipe Feedget <feed@email.com>',
      to: 'Calebe Guimarães <calebeguimaraes10@gmail.com>',
      subject,
      html: body,
    });
  }
}
