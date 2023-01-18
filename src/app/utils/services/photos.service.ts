import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject } from "rxjs";
import { IPost } from "../../types/ipost";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";


export enum Cases {
    SNAKE_CASE = 'sc',
    CAMEL_CASE = 'cc'
}

@Injectable({
    providedIn: 'root'
})
export class PhotosService {
    postQuery = new Subject<string>();

    constructor(private http: HttpClient) {}

    changeCase(item: string, currentCase: Cases, newCase: Cases): string {
        let splitItem: Array<string> = [];
        let result: string;

        switch (currentCase) {
            case Cases.CAMEL_CASE:
                splitItem = [...item.split(/([A-Z][a-z]*)/).filter(Boolean)]
                break;

            case Cases.SNAKE_CASE:
                splitItem = [...item.split('_')]
                break;

            default:
                throw new Error('Not supported');
        }

        switch (newCase) {
            case Cases.SNAKE_CASE:
                result = splitItem.map((str) => str.toLowerCase()).join('_');
                break;

            case Cases.CAMEL_CASE:
                result = splitItem.map((str, index) => {
                    if (index > 0) {
                        return `${str.substring(0, 1).toUpperCase()}${str.substring(1).toLowerCase()}`
                    }
                    return str;
                }).join('');
                break;

            default:
                throw new Error('Not supported');
        }
        return result;
    };

    fetchPosts(postQuery: string | null): Observable<{ success: boolean, posts: Array<IPost>}> {
        type fetchResponse = { posts: Array<{ [index: string]: any }>, liked: Array<number> };
        const params = postQuery? { 'post-query': postQuery }: void 0;

        return this.http.get<fetchResponse>(
            environment.fetchPostsUrl,
            { params, withCredentials: true }
        ).pipe(map((response) => {
            const newPosts = response.posts.map((post) => {
                const newPost: { [index: string]: any } = {};

                Object.entries(post).forEach(([key, value]) => {
                    const newKey = this.changeCase(key, Cases.SNAKE_CASE, Cases.CAMEL_CASE);
                    newPost[newKey] = value;
                });

                if (response.liked.includes(newPost['id'])) {
                    newPost['liked'] = true;
                }

                return newPost as IPost;
            });

            return { success: true, posts: newPosts }
        }), catchError(() => of({ success: false, posts: [] })));
    }
}
