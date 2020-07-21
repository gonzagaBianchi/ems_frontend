import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FamiliesService } from 'src/app/shared/services/families.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IFamily } from '../../shared/models/family.model';
import Swal from 'sweetalert2';
import { FamilyModalComponent } from './family-modal/family-modal.component';

@Component({
  selector: 'app-manage-family',
  templateUrl: './manage-family.component.html',
  styleUrls: ['./manage-family.component.css']
})
export class ManageFamilyComponent implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private familiesService: FamiliesService,
    public modal: MatDialog,
  ) { }

  public displayedColumns: string[] = [
    'name',
    'max_persons',
    'persons',
    'actions'
  ];

  dataSource = new MatTableDataSource<IFamily>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.listFamily();
  }

  listFamily() {
    this.familiesService.getFamilies().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<IFamily>(result);
        this.dataSource.paginator = this.paginator;

        console.log("res: ", result);
      },
      error => {
        Swal.fire('Error!', error, 'warning');
      }
    )
  }

  editFamily(event) {
    this.openModalFamily(event);
  }

  newFamily(event) {
    if (!event) {
      return;
    }

    const family = {
      name: '',
      max_persons: '',
      persons: [],
    };

    this.openModalFamily(family);
  }

  openModalFamily(event) {
    if (!event) {
      return;
    }

    const dialogRef = this.modal.open(FamilyModalComponent, {
      width: '500px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listFamily();
    });
  }

}
