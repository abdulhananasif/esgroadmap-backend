type BaseFilter = Record<string, any>;

export const safeSearch = (baseFilter:BaseFilter , search: string) => {
    const trimmedSearch = search?.trim() || '';
  
    const whereClause: any = {
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
  