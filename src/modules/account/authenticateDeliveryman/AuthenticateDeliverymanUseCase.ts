import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Receber username, password

    // Verificar se username cadastrado existe
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error("Username or password invalid!");
    }

    // Verificar se senha corresponde ao username
    const passwordMatched = await compare(password, deliveryman.password);

    if (!passwordMatched) {
      throw new Error("Username or password invalid!");
    }

    // Gerar o token
    const token = sign({ username }, "10b71ab7420eb452a22787ca4fab501b", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}
