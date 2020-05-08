import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as Mail from 'nodemailer/lib/mailer';
import { IDataMail } from '../../interfaces';
import { RenderHTMLService } from '../renderHTML';
import { UsersKeysService } from '../usersKeys';

// TODO this is temporary solve, in the future we should implement new method for google auth or implement sendgrid API
const nodemailerClient = nodemailer.createTransport(smtpTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: !!process.env.SMTP_SECURE,
    auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS
    }
}));

export class MailService {
    private client = nodemailerClient;

    public sendMail(mail: Mail.Options): void {
        this.client.sendMail(mail, (err: Error | null) => {
            return !err;

        });
    }

    public async generateDataRegMail(id: number, name: string, toMail: string): Promise<IDataMail> {
        const userKeysService = new UsersKeysService();
        const renderHTMLService = new RenderHTMLService();
        const userByKey = await userKeysService.createUserKey(id);
        const html = await renderHTMLService.render('confirmEmail', {
            url: `${process.env.FRONT_URL}:${process.env.FRONT_PORT}/auth/confirm?key=${userByKey.key}&id=${id}`,
            name
        });

        return  {
            from: `Open Social Network<noreply.${process.env.SMTP_AUTH_USER}>`,
            to: toMail,
            subject: 'Email confirmation',
            text: 'confirm your email',
            html
        };
    }
}
