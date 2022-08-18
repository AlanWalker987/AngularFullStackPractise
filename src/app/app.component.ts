import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewSuperHeroComponent } from './components/new-super-hero/new-super-hero.component';
import { SuperHeroServiceService } from './services/super-hero-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularFullStack';
  superHeroesList: any = [];
  displayedColumns: string[] = ['id', 'name', 'firstName', 'secondName', 'place', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private _superHeroService: SuperHeroServiceService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSuperHeroes();
  }

  addNewHero() {
    this.dialog.open(NewSuperHeroComponent, {
      width: '30%',
      disableClose: true,
      autoFocus: false,
      height: 'auto'
    }).afterClosed().subscribe((res) => {
      if (res == 'Save') {
        this.getSuperHeroes();
      }
    })
  }

  getSuperHeroes() {
    this._superHeroService.getSuperHeroes().subscribe({
      next: (response: any) => {
        this.superHeroesList = new MatTableDataSource(response);
        this.superHeroesList.paginator = this.paginator;
        this.superHeroesList.sort = this.sort;
      },
      error: (error: any) => {
        this._snackBar.open("Error Received", error);
      },
      complete: () => console.info('complete')
    });
  }

  editSuperHero(rowData: any) {
    this.dialog.open(NewSuperHeroComponent, {
      width: '30%',
      data: rowData,
      disableClose: true,
      autoFocus: false,
      height: 'auto'
    }).afterClosed().subscribe((res) => {
      if (res == 'Update') {
        this.getSuperHeroes();
      }
    })
  }

  deleteSuperHero(id: number) {
    this._superHeroService.deleteSuperHero(id).subscribe({
      next: () => {
        this._snackBar.open("SuperHero Deleted Successfully");
        this.getSuperHeroes();
      },
      error: (error: any) => {
        this._snackBar.open("Error Received", error);
      },
      complete: () => console.info('complete')
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.superHeroesList.filter = filterValue.trim().toLowerCase();

    if (this.superHeroesList.paginator) {
      this.superHeroesList.paginator.firstPage();
    }
  }

}
