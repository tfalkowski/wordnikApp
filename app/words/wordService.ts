import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Word} from '../../app/words/word';

@Injectable()
export class WordService {

    private baseUrl: string = 'http://api.wordnik.com/v4';
    private apiKey: string = 'YOUR_API_KEY';

    constructor(private http : Http) { }

    getAll(): Observable<Word[]> {
        let words$ = this.http
            .get(`${this.baseUrl}/words.json/randomWords?hasDictionaryDef=1&limit=50&api_key=${this.apiKey}`, {headers: this.getHeaders()})
            .map(this.mapWords)
            .catch(this.handleError);
        return words$;
    }

    getDefinition(word: string): Observable<Word> {
        let word$ = this.http
            .get(`${this.baseUrl}/word.json/${word}/definitions/?api_key=${this.apiKey}`, {headers: this.getHeaders()})
            .map(this.mapWord)
            .catch(this.handleError);
        return word$;
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    private mapWords(response: Response): Word[] {
         return response.json();
     }

    private mapWord(response: Response): Word {
        return response.json()[0];
    }

    private handleError (error: any) {
        let errorMsg = error.message || `Error during retrieving data from the Wordnik API`;
        return Observable.throw(errorMsg);
    }
}
