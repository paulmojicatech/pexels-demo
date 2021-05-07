export interface AppViewModel {
    searchQuery: string;
    currentPage: number;
    gridItems: unknown[];
    photos: Photo[];
    errorMessage: string;
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