import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MainCategory } from 'src/app/core/models/main-category.model';
import { SortOption } from 'src/app/core/models/sort-option.model';
import { ProductFilter } from 'src/app/core/models/product-filter.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tags-sort',
  templateUrl: './tags-sort.component.html',
  styleUrls: ['./tags-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TagsSortComponent implements OnInit{

  @Input() tags$: Observable<string[]>;
  @Input() filteredTags$: Observable<string[]>;
  @Input() mainCategory: MainCategory;
  @Input() sortOptions: SortOption[];
  @Input() filters: ProductFilter;
  @Output() filterSort: EventEmitter<SortOption> = new EventEmitter();
  @Output() filterTags: EventEmitter<string> = new EventEmitter();
  showSortOptions = false;
  currentSortOption: SortOption;

  constructor() { }

  ngOnInit(): void{
    this.currentSortOption = this.sortOptions[0];
  }

  setShowSortOptions(): void{
    this.showSortOptions = !this.showSortOptions;
  }

  setSortOption(sortOption: SortOption): void {
    this.currentSortOption = sortOption;
    this.filterSort.emit(sortOption);
  }

  setFilterTag(tag: string): void {
    this.filterTags.emit(tag);
  }
}
