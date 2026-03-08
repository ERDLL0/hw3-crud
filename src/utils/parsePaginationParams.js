export const parsePaginationParams = (query) => {
    const { page, perPage } = query;
    const parsedPage = parseInt(page, 10);
    const parsedPerPage = parseInt(perPage, 10);
    const isValidPage = !Number.isNaN(parsedPage) && parsedPage > 0;
    const isValidPerPage = !Number.isNaN(parsedPerPage) && parsedPerPage > 0 && parsedPerPage <= 100;

    return {
        page: isValidPage ? parsedPage : 1,
        perPage: isValidPerPage ? parsedPerPage : 10,
    };
};
