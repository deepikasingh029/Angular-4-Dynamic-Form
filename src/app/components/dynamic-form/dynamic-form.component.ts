import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
// import { Http, Headers, Response } from '@angular/http';
// import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import * as _ from "lodash";
import { Location } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  userform:FormGroup;
  addresses:FormArray;

  current: any={
  contactAddresses:[]
  }

  constructor( 
) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.addresses=new FormArray([
      this.initAddress()
    ]);

    this.userform = new FormGroup({

    addresses: this.addresses

    })

    // this.userform.valueChanges
    // .debounceTime(400)
    // .subscribe(data =>
    //   this.validateForm(this.userform, this.formErrors)
    // );


  
  }

  initAddress(){
      return new FormGroup({
        // id: new FormControl(),
        addressLine1: new FormControl(),
        addressLine2: new FormControl(),
        addressLine3: new FormControl(),
        postalcode: new FormControl()
      })
  }

  addAddress() {
    const control = <FormArray>this.addresses;
    control.push(this.initAddress());

  }
 removeAddress(i: number) {
    const control = <FormArray>this.addresses;
    control.removeAt(i);
  }




  bindToForm() {

  
    const _count=(<FormArray>this.addresses).length;
    for(var i=0;i<_count;i++){
      (<FormArray>this.addresses).removeAt(i);
    }
   

    if (this.current.contactAddresses) {
      
      for (var index = 0; index < this.current.contactAddresses.length; index++) {
        this.addAddress();

        // (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.id.setValue(this.current.contactAddresses[index].id);
        (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.addressLine1.setValue(this.current.contactAddresses[index].addressLine1);
        (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.addressLine2.setValue(this.current.contactAddresses[index].addressLine2);
        (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.addressLine3.setValue(this.current.contactAddresses[index].addressLine3);
        (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.zipCode.setValue(this.current.contactAddresses[index].zipCode); 
      }
    }
  }

  onSubmit(){
    console.log("submit");

    this.current.contactAddresses = [];
    
    for (var index = 0; index < (<FormArray>this.addresses).length; index++) {
      if((<FormGroup>(<FormArray>this.addresses).controls[index]).controls.addressLine1.value){
        this.current.contactAddresses.push({
          // id:(<FormGroup>(<FormArray>this.addresses).controls[index]).controls.id.value,
          addressLine1: (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.addressLine1.value,
          addressLine2: (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.addressLine2.value,
          addressLine3: (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.addressLine3.value,
          zipCode: (<FormGroup>(<FormArray>this.addresses).controls[index]).controls.zipCode.value,
        });
      }
    }
  }


}
