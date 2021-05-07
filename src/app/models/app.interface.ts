export interface AppViewModel {
    searchQuery: string;
    currentPage: number;
    gridItems: unknown[];
    photos: Photo[];
    errorMessage: string;
    totalResults: number;
    nextPageUrl: string;
    previousPageUrl: string;
}

export interface PexelsApiResponse {
    page: number;
    per_page: number;
    photos: Photo[];
    next_page: string;
    previous_page: string;
    total_results: number;
}

export interface Photo {
    id: number;
    url: string;
    photographer: string;
    src: PhotoMetadata;
}

export interface PhotoMetadata {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
}