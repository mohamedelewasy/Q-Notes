import asyncHandler from 'express-async-handler';
import { uuid } from 'uuidv4';

import { mail } from '../../config/mail';
import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { hashPassword } from '../../utils/password.util';
import { generateToken } from '../../utils/token.util';

// route:   POST /auth/signup
// access:  public
export const signup = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ApiError('email and password are required', 400));
  if (password.length < 6) return next(new ApiError('password must be 6 or greater', 400));
  if (await UserModel.findOne({ where: { email } }))
    return next(new ApiError('email is already exists', 400));

  const hashedPassword = hashPassword(password);
  const id = uuid();
  const plainVerificationCode = generateVerificationCode();
  const verificationCode = hashPassword(plainVerificationCode);
  const user = await UserModel.create({
    id,
    email,
    password: hashedPassword,
    verificationCode,
  });

  // sendVerificationMail(plainVerificationCode, email);
  const token = generateToken(user.id);
  res.locals.userId = user.id;
  await user.update({ token });
  res.status(200).json({ token, id: user.id });
});

const generateVerificationCode = () => {
  const res: string[] = [];
  for (let i = 0; i < 5; i++) {
    res.push(Math.random().toString(36).substring(2));
  }
  return res.join('');
};

const sendVerificationMail = (code: string, email: string) => {
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
    ${process.env.URL}/api/v1/auth/verify/${code}
    <p>Once you have completed the verification process, you will be able to access all the features of our website, including interactive lessons, quizzes, and other resources that will help you improve your English language skills.</p>
    <p>Thank you for choosing Q-Notes as your learning partner.</p>
    Best regards,
    Q-Notes Team
    `,
    },
    (err, info) => {
      err ? console.log(err) : null;
    }
  );
};
