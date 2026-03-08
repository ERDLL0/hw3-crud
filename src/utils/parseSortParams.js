export const parseSortParams = (query) => {
    const { sortBy, sortOrder } = query;
    const allowedSortByFields = ['_id', 'name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'createdAt', 'updatedAt'];
    const parsedSortBy = allowedSortByFields.includes(sortBy) ? sortBy : '_id';

    // Fallback to explicitly valid sort order values
    const allowedSortOrderFields = ['asc', 'desc'];
    const parsedSortOrder = allowedSortOrderFields.includes(sortOrder) ? sortOrder : 'asc';

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder,
    };
};
