import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Receber username, password

    // Verificar se username cadastrado existe
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    // Verificar se senha corresponde ao username
    const passwordMatched = await compare(password, client.password);

    if (!passwordMatched) {
      throw new Error("Username or password invalid!");
    }

    // Gerar o token
    const token = sign({ username }, "9eb71ab7420eb452a22787ca4fab501b", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
