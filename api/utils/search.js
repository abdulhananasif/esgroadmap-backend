export const safeSearch = (baseFilter, search) => {
    const trimmedSearch = search?.trim() || '';
    const whereClause = {
        ...baseFilter,
    };
    if (trimmedSearch) {
        whereClause.OR = [
            { Company: { contains: trimmedSearch } },
            { Target_sentence: { contains: trimmedSearch } },
            { SentenceTargetYear: { contains: trimmedSearch } },
            { upload_date: { contains: trimmedSearch } },
            { Country: { contains: trimmedSearch } },
            { SectorCode1: { contains: trimmedSearch } },
            { SectorName1: { contains: trimmedSearch } },
            { upload_date: { contains: trimmedSearch } },
        ];
    }
    return whereClause;
};
