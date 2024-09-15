import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../model/User';

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
		
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });

    }
		
    req.user = user; 
    next(); 

  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });

  }
};

export default authMiddleware;