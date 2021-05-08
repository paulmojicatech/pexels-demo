import { AppViewModel, PexelsApiResponse } from "../models/app.interface";

export const PEXELS_MOCK_RESPONSE: PexelsApiResponse = {
    page: 1,
    per_page: 30,
    next_page: 'test.com',
    previous_page: 'prev.test.com',
    photos: [
        {
            id: 1,
            src: {
                original: 'a',
                tiny:'b',
                landscape: 'c',
                portrait: 'd',
                large: 'e',
                large2x: 'f',
                medium: 'g',
                small: 'h'
            },
            url: 'test.com',
            photographer: 'Paul'
        }
    ],
    total_results: 1
}

export const PARSED_MOCK_RESPONSE = {
    currentPage: 1,
    totalResults: 1,
    photos: [
        {
            id: 1,
            src: {
                original: 'a',
                tiny:'b',
                landscape: 'c',
                portrait: 'd',
                large: 'e',
                large2x: 'f',
                medium: 'g',
                small: 'h'
            },
            url: 'test.com',
            photographer: 'Paul'
        }
    ],
    nextPageUrl: 'test.com',
    previousPageUrl: 'prev.test.com',
};
