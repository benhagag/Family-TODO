import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../services/family.service';




@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  family: Array<object>;
  onefamily: any;
  familyUrl: string;
  addfamilyformm: Boolean;
  editfamilyformm:  Boolean;
  name: string;
  nickname: string;
  description: String;



  constructor(private _familyservice: FamilyService) {

    this.addfamilyformm = false;
   this.editfamilyformm = false;
   }

  getAllfamily(): void {
    this._familyservice.getallfamily()
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe((data) => {
        this.family = data['families'];
        console.log(this.family);
      });
  }
  // add family method POST
  addfamily(name: string, nickname: string, description: string): void {
    this._familyservice.addfamily({ name: name, nickname: nickname, description: description })
      .subscribe(onefamily => {
        this.family.push(onefamily);
        this.getAllfamily();
      });
  }

  // delete family method DELETE
  deletefamily(onefamily): void {
    console.log(onefamily);
    this.familyUrl = onefamily['request']['url'];
    console.log(this.familyUrl);
    // tslint:disable-next-line:no-shadowed-variable
    this.family = this.family.filter(d => d !== onefamily);
    this._familyservice.deletefamily(this.familyUrl).subscribe(() => {
      this.getAllfamily();
    });
  }
// edit family
  editfamilyfunc(name, nickname, description, url): void {
    this._familyservice.editfamily({ name: name, nickname: nickname, url: url, description: description})  .subscribe(onefamily => {
      this.family.push(onefamily);
      this.getAllfamily();
    });
  }

  ngOnInit() {
    this.getAllfamily();
  }
  // this is for hide or show add form
  showaddform(): void {
    this.addfamilyformm = true;
    this.editfamilyformm = false;
  }
  hideaddform(): void {
    this.addfamilyformm = false;
  }

  // this is for hide ashow edit form
  showeditform(onefamily): void {
    console.log(onefamily);
    this.name = onefamily.name;
    this.nickname = onefamily.nickname;
    this.description = onefamily.description;
    this.onefamily = onefamily.request.url;
    this.editfamilyformm = true;
    this.addfamilyformm = false;
  }

  hideeditform(): void {
    this.editfamilyformm = false;
  }

}
