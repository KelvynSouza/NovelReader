import { Routes } from '@angular/router';

import { TestsListComponent } from 'app/tests-list/tests-list.component';
import { BookReaderComponent} from '../../book-reader/book-reader.component';
import { BookChapterComponent} from '../../book-reader/book-chapter/book-chapter.component';

export const AdminLayoutRoutes: Routes = [    
    { path: 'tests-list',  component: TestsListComponent },
    { path: 'book-reader',  component: BookReaderComponent },
    { path: 'book-chapter/:number',  component: BookChapterComponent },


];
