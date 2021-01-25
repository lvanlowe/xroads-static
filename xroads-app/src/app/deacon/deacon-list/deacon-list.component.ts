import { Component, OnInit } from '@angular/core';
import { LoadAll } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Diaconate } from 'src/app/models/diaconate';
import { AppState } from 'src/app/state/app.state';
import { allDiaconates, loadedDiaconate, loadingDiaconate } from 'src/app/state/diaconate.state';

@Component({
  selector: 'app-deacon-list',
  templateUrl: './deacon-list.component.html',
  styleUrls: ['./deacon-list.component.scss']
})
export class DeaconListComponent implements OnInit {

  // isDeacon$: Observable<boolean>;
  view: Observable<Diaconate[]>;
  isLoadingDiaconate: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(loadedDiaconate)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new LoadAll(Diaconate));
      }
    });

    this.store.pipe(select(loadingDiaconate))
    .subscribe(loading => {
      this.isLoadingDiaconate = loading;
      this.view = this.store.pipe(select(allDiaconates));
    });
  }

}
