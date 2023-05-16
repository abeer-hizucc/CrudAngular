import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
form: FormGroup |any;
constructor(private postService: PostService, private router: Router) { }
ngOnInit(): void {
  this.form = new FormGroup({
    title: new FormControl('',[Validators.required]),
    body: new FormControl('',[Validators.required])
  });
}
get f(){
  return this.form?.controls;
}
submit(){
  this.postService.create(this.form?.value).subscribe(res => {
    this.router.navigateByUrl('post/index');
  });
}
}
