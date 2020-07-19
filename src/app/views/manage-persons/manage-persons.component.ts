import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ManagePersonsService } from '../../shared/services/manage-persons.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { PersonModalComponent } from './person-modal/person-modal.component';
// import { NewPersonComponent } from '../new-person/new-person.component';

export interface personModel {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
  family: number;
  role: string;
};

@Component({
  selector: 'app-manage-persons',
  templateUrl: './manage-persons.component.html',
  styleUrls: ['./manage-persons.component.css']
})

export class ManagePersonsComponent implements OnInit {

  constructor(
    private managePersonsService: ManagePersonsService,
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
  public acoesDaTabela = [];

  dataSource = new MatTableDataSource<personModel>(personData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.buildActionsTable();

    // this.listPersons();
  }
  buildActionsTable() {


    this.acoesDaTabela.push({
      nomeIcone: 'editar',
      tooltip: 'Editar Rota'
    });

    this.acoesDaTabela.push({
      nomeIcone: 'excluir',
      tooltip: 'Excluir Rota'
    });
  }

  listPersons() {
    this.managePersonsService.getPersons().subscribe(
      result => {
        this.dataSource = result;
      },
      error => {
        Swal.fire('Error!', error, 'warning');
      }
    )
  }

  editPerson(event) {
    if (!event) {
      return;
    }

    this.openModalPerson(event);

    console.log("edit: ", event)
    return
    this.managePersonsService.editPerson(event).subscribe(
      result => {
        Swal.fire(
          'Edited!',
          'Value Edited.',
          'success'
        );
      },
      error => {
        Swal.fire('Error!', error, 'warning');
      }
    )
  }

  deletePerson(event) {
    if (!event) {
      return;
    }

    console.log("delete: ", event)
    return
    this.managePersonsService.deletePerson(event.id).subscribe(
      result => {
        Swal.fire(
          'Deleted!',
          'Value Deleted.',
          'success'
        );
      },
      error => {
        Swal.fire('Error!', error, 'warning');
      }
    )
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
      console.log(`Dialog result: ${result}`);
    });

  }
}

const personData: personModel[] = [
  { id: 1, username: "admin", password: "admin", name: "", age: 0, family: 9, role: "admin" },
  { id: 2, username: "person2", password: "pass", name: "", age: 0, family: 9, role: "normal" },
  { id: 3, username: "person3", password: "pass", name: "", age: 0, family: 9, role: "normal" },
  { id: 4, username: "person4", password: "pass", name: "", age: 0, family: 9, role: "normal" },
  { id: 5, username: "person5", password: "pass", name: "", age: 0, family: 9, role: "normal" },
  { id: 6, username: "person6", password: "pass", name: "", age: 0, family: 9, role: "normal" },
  { id: 7, username: "person7", password: "pass", name: "", age: 0, family: 9, role: "normal" },
  { id: 8, username: "person8", password: "pass", name: "", age: 0, family: 9, role: "normal" },
  { id: 9, username: "person9", password: "pass", name: "", age: 0, family: 9, role: "normal" },
  { id: 10, username: "person10", password: "pass", name: "", age: 0, family: 9, role: "normal" },

];





