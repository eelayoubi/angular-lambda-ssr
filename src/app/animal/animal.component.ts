import { Component, OnInit, OnDestroy } from '@angular/core';
import { Animal, SearchService } from '../shared';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit, OnDestroy {
  animal: Animal;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: SearchService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = + params.id; // (+) converts string 'id' to a number
      this.service.get(id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(animal => {
          if (animal) {
            this.animal = animal;
          } else {
            this.gotoList();
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  cancel() {
    this.router.navigate(['/search']);
  }

  gotoList() {
    if (this.animal) {
      this.router.navigate(['/search', { term: this.animal.name }]);
    } else {
      this.router.navigate(['/search']);
    }
  }
}