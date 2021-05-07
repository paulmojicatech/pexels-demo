import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Photo } from '../models/app.interface';
import { catchError, delay, map, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PexelsHttpService {
    private _pexelsUrl = environment.pexelsApiUrl;
    private _apiKey = environment.apiKey;
    private _itemsPerPage = environment.itemsPerPage;

    constructor(private _httpClient: HttpClient) {}

    fetchPhotos(page: number, searchQuery: string): Observable<Photo[]> {
        const headers = {
            Authorization: this._apiKey
        };
        return this._httpClient
            .get(
                `${this._pexelsUrl}search?query=${searchQuery}&per_page=${this._itemsPerPage}&page=${page}`,
                { headers }
            )
            .pipe(
                map((httpResp: any) => {
                    const photos = (httpResp.photos as any[]).map(
                        (photoResp) => {
                            const { id, photographer, src, url } = photoResp;
                            const photo: Photo = {
                                id,
                                photographer,
                                src,
                                url
                            };
                            return photo;
                        }
                    );
                    return photos;
                }),
                take(1),
                catchError((err) => throwError(err))
            );
    }
}
