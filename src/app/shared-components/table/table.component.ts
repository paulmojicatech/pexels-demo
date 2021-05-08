import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TableColumnMetadata, TableMetadata } from './models/table.interface';
@Component({
  selector: 'pmt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

  @Input()
  tableMetadata: TableMetadata;
  columnsToDisplay: string[];

  constructor(public domSanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.columnsToDisplay = this.tableMetadata.columns
      .filter(col => !col.isHidden)
      .map(col => col.label);
  }

}
