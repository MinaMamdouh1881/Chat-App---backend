import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const Compare = async (userPassword, DBPassword) => {
  return await bcrypt.compare(userPassword, DBPassword);
};
