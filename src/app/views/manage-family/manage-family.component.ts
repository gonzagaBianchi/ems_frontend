import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FamiliesService } from 'src/app/shared/services/families.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IFamily } from '../../shared/models/family.model';
import { FamilyModalComponent } from './family-modal/family-modal.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-manage-family',
  templateUrl: './manage-family.component.html',
  styleUrls: ['./manage-family.component.css']
})
export class ManageFamilyComponent implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private familiesService: FamiliesService,
    private auth: AuthService,
    public modal: MatDialog,
  ) { }

  public displayedColumns: string[] = [
    'name',
    'max_persons',
    'persons',
    'actions'
  ];
  public messageNoResults = "No result";
  public searchResults = "Search for Results";
  public isLoading = true;

  dataSource = new MatTableDataSource<IFamily>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit(): void {
    this.startLoad();
    this.listFamily();
  }

  startLoad() {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
  }

  stopLoad() {
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  } 

  listFamily() {
    this.startLoad();

    this.familiesService.getFamilies().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<IFamily>(result);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.stopLoad();

        Swal.fire('Error!', error, 'warning');
      },
      () => {
        this.stopLoad();
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
    if (!event || !this.validRole()) {
      return;
    }

    const dialogRef = this.modal.open(FamilyModalComponent, {
      width: '800px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listFamily();
    });
  }

  validRole() {
    let rtn = true

    if (this.auth.getRole !== "admin") {
      rtn = false;
    }

    return rtn;
  }
}
