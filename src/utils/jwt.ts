import * as jwt from 'jsonwebtoken';

export const generateJWT = (payload: {}) => {
  console.log(jwt)
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET || '',
    { expiresIn: process.env.JWT_DURATION },
  );
};

export const verifyJWT = (token: string) => {
  try {
    console.log(token,'tokennnnnnnnnnnnnn===============')
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new Error('Token is invalid');
  }
};


