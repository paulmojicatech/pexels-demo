import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { PexelsApiResponse, Photo } from '../models/app.interface';
import { catchError, delay, map, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PexelsHttpService {
    private _pexelsUrl = environment.pexelsApiUrl;
    private _apiKey = environment.apiKey;
    private _itemsPerPage = environment.itemsPerPage;

    constructor(private _httpClient: HttpClient) {}

    fetchPhotos(page: number, searchQuery: string): Observable<{ nextPageUrl: string; previousPageUrl: string; totalResults: number; photos: Photo[]}> {
        const headers = {
            Authorization: this._apiKey
        };
        return this._httpClient
            .get<PexelsApiResponse>(
                `${this._pexelsUrl}search?query=${searchQuery}&per_page=${this._itemsPerPage}&page=${page}`,
                { headers }
            )
            .pipe(
                map((httpResp) => {
                    const { photos, next_page, previous_page, total_results } = httpResp;
                    return {
                        nextPageUrl: next_page,
                        previousPageUrl: previous_page,
                        totalResults: total_results,
                        photos
                    };
                }),
                catchError((err) => throwError(err))
            );
    }
}
