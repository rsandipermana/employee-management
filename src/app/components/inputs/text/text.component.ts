import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() label: string = 'label';
  @Input() name: string = 'name';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.valueChange.emit(this.value);
  }
}
