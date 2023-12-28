import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ClinicService } from '../_services/clinic.service';
import { Clinic } from '../interfaces/clinic.model';
import { ClinicSharedService } from '../_services/clinic-shared.service';

@Component({
  selector: 'app-list-clinic',
  templateUrl: './list-clinic.component.html',
  styleUrls: ['./list-clinic.component.css']
})
export class ListClinicComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'region', 'specialties', 'active', 'actions'];
  dataSource!: MatTableDataSource<Clinic>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private clinicService: ClinicService,
    private clinicSharedService: ClinicSharedService,
  ) {
  }

  ngOnInit() {
    this.clinicService.getClinics().subscribe(clinics => {
      this.dataSource = new MatTableDataSource(clinics);
    });
  }

  ngAfterViewInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.performSearch();
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  searchText: string = '';

  createClinic() {
    this.router.navigate(['/create-clinic']);
  }

  clearSearch() {
    this.searchText = '';
    this.onSearchInputChange();
  }

  onSearchInputChange() {
    this.searchSubject.next(this.searchText);
  }

  performSearch() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  viewAction(element: Clinic) {
    this.clinicSharedService.setClinic(element);
    this.router.navigate(['/view-clinic']);
  }

  editAction(element: Clinic) {
    this.clinicSharedService.setClinic(element);
    this.router.navigate(['/edit-clinic']);
  }
}
