export const generateVerificationCode = () => {
  const res: string[] = [];
  for (let i = 0; i < 5; i++) {
    res.push(Math.random().toString(36).substring(2));
  }
  return res.join('');
};
