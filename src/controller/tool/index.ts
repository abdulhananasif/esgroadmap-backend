import {Response} from 'express';
import {AuthenticatedRequest} from '../../types/request.js';
import {prisma} from '../../server.js';

export const carbonReduction = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  let response: {
    status?: number;
    message?: string | Object | Array<Object>;
  } = {};

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const carbonSentence = await prisma.sentenceallview.findMany({
      where: {
        sentence_carbon: 1,
      },
      select: {
        id: true,
        Company: true,
        DocURL: true,
        Target_sentence: true,
        SentenceTargetYear: true,
        upload_date: true,
        Country: true,
        SectorCode1: true,
        SectorName1: true,
      },
      orderBy: {
        id: 'asc',
      },

      skip: (page - 1) * limit,
      take: limit,
    });
    response.status = 200;
    response.message = carbonSentence;
  } catch (err: any) {
    response.status = 400;
    response.message = err.message;
  }
  res.status(response.status).json(response.message);
};
