import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoPadrao';

interface DecodedToken extends JwtPayload {
  id?: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization ?? '';

  if (!authHeader) {
    console.error('Erro: Token não fornecido.');
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer?.toLowerCase() !== 'bearer' || !token) {
    console.error('Erro: Token mal formatado.');
    return res.status(401).json({
      error: 'Token inválido ou mal formatado. Formato esperado: Bearer <token>.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded !== 'object' || !decoded) {
      return res.status(401).json({ error: 'Token inválido.' });
    }

    const { id } = decoded as DecodedToken;
    console.log(`Log: Acesso autorizado para ID: ${id || 'N/A'}`);

    return next();

  } catch (err: any) {
    let errorMessage = 'Token inválido.';
    let status = 401;

    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Token expirado. Faça login novamente.';
      status = 403;
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Assinatura do token inválida.';
    }

    console.error(`Erro JWT: ${errorMessage}`, err.message);
    return res.status(status).json({ error: errorMessage });
  }
};
