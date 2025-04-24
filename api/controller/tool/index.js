import { prisma } from '../../server.js';
export const carbonReduction = async (req, res) => {
    let response = {};
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const dataCount = await prisma.sentenceallview.count();
        const totalPages = Math.ceil(dataCount / limit);
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
        response.message = { carbonSentence, totalPages };
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
