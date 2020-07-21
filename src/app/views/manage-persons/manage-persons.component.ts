import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ManagePersonsService } from '../../shared/services/manage-persons.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { PersonModalComponent } from './person-modal/person-modal.component';
import { IPerson } from '../../shared/models/person.model';
import { FamiliesService } from 'src/app/shared/services/families.service';

@Component({
  selector: 'app-manage-persons',
  templateUrl: './manage-persons.component.html',
  styleUrls: ['./manage-persons.component.css']
})

export class ManagePersonsComponent implements OnInit {

  constructor(
    private managePersonsService: ManagePersonsService,
    private changeDetectorRef: ChangeDetectorRef,
    private familiesService: FamiliesService,
    public modal: MatDialog,
  ) { }

  public displayedColumns: string[] = [
    'username',
    'password',
    'name',
    'age',
    'family',
    'role',
    'actions'
  ];

  familyData: Array<object>;

  dataSource = new MatTableDataSource<IPerson>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.getFamily();
    this.listPersons();
  }

  listPersons() {
    this.managePersonsService.getPersons().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<IPerson>(result);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        // falar sobre mensagem API
        Swal.fire('Error!', error, 'warning');
      },
      () => {
        this.changeDetectorRef.detectChanges();
      }
    )
  }

  editPerson(event) {
    this.openModalPerson(event);
  }

  deletePerson(element: IPerson) {
    Swal.fire({
      title: 'Do you have shure?',
      text: 'You cannot to reverse it',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {
        this.managePersonsService.deletePerson(element.id).subscribe(
          result => {
            Swal.fire(
              'Deleted!',
              'Value Deleted.',
              'success'
            );

            this.listPersons();
          },
          error => {
            Swal.fire('Error!', error, 'warning');
          }
        )
      }
    });
  }

  newPerson(event) {
    if (!event) {
      return;
    }

    const person = {
      username: '',
      password: '',
      name: '',
      age: '',
      family: '',
      role: '',
      actions: '',
    };

    this.openModalPerson(person);
  }

  openModalPerson(event) {
    if (!event) {
      return;
    }

    const dialogRef = this.modal.open(PersonModalComponent, {
      width: '500px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listPersons();
    });
  }

  getFamily() {
    this.familiesService.getFamilies().subscribe(
      result => {
        this.familyData = [];

        result.forEach(element => {
          let x = { id: element.id, name: element.name };
          this.familyData.push(x);
        });

        console.log("res: ", result);
      },
      error => {
        Swal.fire('Error!', error, 'warning');
      }
    )
  }
}





