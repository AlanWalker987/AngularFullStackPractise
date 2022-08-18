import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperHeroServiceService } from 'src/app/services/super-hero-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-super-hero',
  templateUrl: './new-super-hero.component.html',
  styleUrls: ['./new-super-hero.component.scss']
})
export class NewSuperHeroComponent implements OnInit {

  superHeroesForm !: FormGroup;
  actionBtn: string = "Save Hero";
  dialogTitle: string = "Add New SuperHero";

  constructor(private formBuilder: FormBuilder,
    private _superHeroService: SuperHeroServiceService,
    private dialogRef: MatDialogRef<NewSuperHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.superHeroesForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      place: ['', Validators.required]
    })

    if (this.editData) {
      this.actionBtn = 'Update Hero';
      this.dialogTitle = "Update SuperHero";
      this.superHeroesForm.controls['id'].setValue(this.editData.id);
      this.superHeroesForm.controls['name'].setValue(this.editData.name);
      this.superHeroesForm.controls['firstName'].setValue(this.editData.firstName);
      this.superHeroesForm.controls['secondName'].setValue(this.editData.secondName);
      this.superHeroesForm.controls['place'].setValue(this.editData.place);
    }
  }

  saveHero(): void {
    if (!this.editData) {
      if (this.superHeroesForm.valid) {
        const data = this.superHeroesForm.value;
        this._superHeroService.postNewSuperHero(data).subscribe(({
          next: () => {
            this._snackBar.open("SuperHero Added Successfully", data.name);
            this.superHeroesForm.reset();
            this.dialogRef.close('Save');
          },
          error: (err) => {
            this._snackBar.open("Error Received", err);
          }
        })
        )
      }
    } else {
      this.updateHero();
    }
  }

  updateHero() {
    const data = this.superHeroesForm.value;
    this._superHeroService.putSuperHero(data).subscribe({
      next: (res) => {
        this._snackBar.open("SuperHero Updated Successfully", data.name);
        this.superHeroesForm.reset();
        this.dialogRef.close('Update');
      },
      error: (err) => {
        this._snackBar.open("Error Received", err);
      }
    })
  }

}
