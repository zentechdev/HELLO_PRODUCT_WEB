import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-expired-dialog',
  templateUrl: './token-expired-dialog.component.html',
  styleUrls: ['./token-expired-dialog.component.css']
})
export class TokenExpiredDialogComponent implements OnInit {
  formGroup!: FormGroup;
  
  constructor(private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      emailID: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
}
