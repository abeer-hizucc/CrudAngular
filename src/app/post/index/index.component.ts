import { Component, OnInit } from '@angular/core';  
import { PostService } from '../post.service';
import { Post } from '../post';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      console.log(this.posts);
    })
  }
  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item.id !== id);
      console.log('Post deleted successfully!');
    })
  }
  navigateToEdit(id:number){
    console.log(this.posts[id]);
  }
  navigateToView(id:number){
    console.log(this.posts[id]);
}
submitButton() {
  console.log("Submit button clicked");
} 


}

