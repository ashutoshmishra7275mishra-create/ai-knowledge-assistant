import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); 
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};
