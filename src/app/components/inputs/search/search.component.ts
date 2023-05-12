import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'input-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() keyword = new EventEmitter<string>();
  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange() {
    this.keyword.emit(this.searchValue);
  }
}
