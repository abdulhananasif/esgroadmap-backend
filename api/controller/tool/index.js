import { prisma } from '../../server.js';
import { safeSearch } from '../../utils/search.js';
export const carbonReduction = async (req, res) => {
    console.log("🚀 ~ req:", req);
    let response = {};
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { search } = req.query;
        const searchStr = typeof search === 'string' ? search : '';
        const baseFilter = {
            sentence_carbon: 1,
        };
        const whereClause = safeSearch(baseFilter, searchStr);
        const dataCount = await prisma.sentenceallview.count({ where: whereClause });
        const totalPages = Math.ceil(dataCount / limit);
        const carbonSentence = await prisma.sentenceallview.findMany({
            where: whereClause,
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
export const wasteAndRecycling = async (req, res) => {
    let response = {};
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { search } = req.query;
        const searchStr = typeof search === 'string' ? search : '';
        const baseFilter = {
            sentence_waste: 1,
        };
        const whereClause = safeSearch(baseFilter, searchStr);
        const dataCount = await prisma.sentenceallview.count({ where: whereClause });
        const totalPages = Math.ceil(dataCount / limit);
        const wasteSentence = await prisma.sentenceallview.findMany({
            where: whereClause,
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
        response.message = { wasteSentence, totalPages };
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
export const waterManagement = async (req, res) => {
    let response = {};
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { search } = req.query;
        const searchStr = typeof search === 'string' ? search : '';
        const baseFilter = {
            sentence_water: 1,
        };
        const whereClause = safeSearch(baseFilter, searchStr);
        const dataCount = await prisma.sentenceallview.count({ where: whereClause });
        const totalPages = Math.ceil(dataCount / limit);
        const waterSentence = await prisma.sentenceallview.findMany({
            where: whereClause,
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
        response.message = { waterSentence, totalPages };
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
export const sentenceGender = async (req, res) => {
    let response = {};
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { search } = req.query;
        const searchStr = typeof search === 'string' ? search : '';
        const baseFilter = {
            sentence_gender: 1,
        };
        const whereClause = safeSearch(baseFilter, searchStr);
        const dataCount = await prisma.sentenceallview.count({ where: whereClause });
        const totalPages = Math.ceil(dataCount / limit);
        const genderSentence = await prisma.sentenceallview.findMany({
            where: whereClause,
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
        response.message = { genderSentence, totalPages };
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
export const supplyChain = async (req, res) => {
    let response = {};
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { search } = req.query;
        const searchStr = typeof search === 'string' ? search : '';
        const baseFilter = {
            sentence_suppliers: 1,
        };
        const whereClause = safeSearch(baseFilter, searchStr);
        const dataCount = await prisma.sentenceallview.count({ where: whereClause });
        const totalPages = Math.ceil(dataCount / limit);
        const supplyChain = await prisma.sentenceallview.findMany({
            where: whereClause,
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
        response.message = { supplyChain, totalPages };
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
export const renewables = async (req, res) => {
    let response = {};
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const { search } = req.query;
        const searchStr = typeof search === 'string' ? search : '';
        const baseFilter = {
            sentence_renewables: 1,
        };
        const whereClause = safeSearch(baseFilter, searchStr);
        const dataCount = await prisma.sentenceallview.count({ where: whereClause });
        const totalPages = Math.ceil(dataCount / limit);
        const renewablesSentence = await prisma.sentenceallview.findMany({
            where: whereClause,
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
        response.message = { renewablesSentence, totalPages };
    }
    catch (err) {
        response.status = 400;
        response.message = err.message;
    }
    res.status(response.status).json(response.message);
};
