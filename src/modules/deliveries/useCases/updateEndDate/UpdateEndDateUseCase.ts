import { prisma } from "../../../../database/prismaClient";

interface IUpdateEndDate {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateEndDate) {
    const result = await prisma.deliveries.updateMany({
      // updateMany para fazer com varias condicoes
      where: {
        id: id_delivery,
        id_deliveryman, // Para verificar se o deliveryman certo esta finalizando o processo
      },
      // where:
      // {
      //   link_delivery_deliveryman: {
      //     id: id_delivery,
      //     id_deliveryman,
      //   }
      // },
      data: {
        end_at: new Date(),
      },
    });

    return result;
  }
}
