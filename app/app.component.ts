import {Component} from '@angular/core';
import {Word} from './words/word';
import {WordService} from './words/wordService';

class PrimeWord implements Word {
    constructor(public id, public word) {}
}

@Component({
    templateUrl: 'app/app.component.html',
    selector: 'words-list'
})
export class AppComponent {
    words: Word[] = [];

    errorMessage: string = '';

    isLoading: boolean = true;

    displayDialog: boolean;

    word: Word = new PrimeWord(1, 'default');

    selectedWord: Word;

    constructor(private wordService : WordService) { }

    ngOnInit() {
        this.wordService
            .getAll()
            .subscribe(
                p => this.words = p,
                e => this.errorMessage = e,
                () => this.isLoading = false
            );
    }

    onRowSelect(event) {
        this.word = this.cloneWord(event.data);
        var word = this.word.word;
        this.wordService.getDefinition(this.word.word).subscribe(p => this.word = p);
        this.word.word = word;
        this.displayDialog = true;
    }

    cloneWord(c: Word): Word {
        let word = new PrimeWord(1, 'default');
        for (let prop in c) {
            word[prop] = c[prop];
        }
        return word;
    }
}
