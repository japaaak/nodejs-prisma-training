import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Pegar pelo header
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing",
    });
  }

  // Bearer 56483658734;
  // [0] Bearer
  // [1] 56483658734
  const [, token] = authHeader.split(" "); // Separar pelo espaco

  // Verificar se o token e valido
  try {
    const { sub } = verify(
      token,
      "10b71ab7420eb452a22787ca4fab501b"
    ) as IPayload; // Segundo parameto chave (Que utilizou para generar token)

    request.id_deliveryman = sub; // Colocar o sub(id_deliveryman) dentro do request;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
