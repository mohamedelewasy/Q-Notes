import { ENV } from '../config/env';
import { mail } from '../config/mail';

export const sendVerificationMail = (code: string, email: string) => {
  mail.sendMail(
    {
      from: 'Q-Notes Team',
      to: email,
      subject: 'Q-Notes verification',
      html: `
    <h1>Q-Notes</h1>
    Dear Student,
    <p>We are delighted to welcome you to Q-Notes, a platform that offers comprehensive and interactive English language courses. Thank you for signing up with us and showing your interest in improving your language skills.</p>
    <p>As part of our security measures, we require all users to verify their accounts before accessing the full range of features on our website. This verification process ensures that only genuine users have access to our services and helps us maintain a safe and secure environment for all.</p>
    To complete the verification process, please click on this link
    ${ENV.DOMAIN_URL}/verify/${code}
    <p>Once you have completed the verification process, you will be able to access all the features of our website, including interactive lessons, quizzes, and other resources that will help you improve your English language skills.</p>
    <p>Thank you for choosing Q-Notes as your learning partner.</p>
    Best regards,
    Q-Notes Team
    `,
    },
    err => {
      err ? console.log(err) : null;
    }
  );
};
