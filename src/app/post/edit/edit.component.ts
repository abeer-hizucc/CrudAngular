import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
 export class EditComponent implements OnInit {
  id:number | undefined;
  post:Post |undefined;
  form : FormGroup|undefined;
  constructor(public postService:PostService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.postService.find(this.id!).subscribe((data: Post) => {
      this.post = data;
    });
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
   

  }
  get f(){
    return this.form!.controls;
  }
  submit(){
    console.log(this.form!.value);
    this.postService.update(this.id!,this.form!.value).subscribe(res => {
      console.log('Post updated successfully!');
      this.router.navigate(['/post/index']);
    })
  }


}
