import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // data binding
  title:any;

  // Object
  book:any={};

  // collection
  books:any=[];

  constructor(
    public dialog:MatDialog,
    public api:ApiService
  ) { }

  ngOnInit(): void {

    this.title='Product'
    this.book={
      title:'Angular',
      author:'ilham',
      year:2021,
      isbn:'121212121',
      price: 100000
    };
    this.getBooks();
  }

  getBooks(){
    this.api.get('books').subscribe(res=>{
      this.books=res;
    })
  }

  productDetail(data,index){
    let dialog=this.dialog.open(ProductDetailComponent, {
      width:'400px',
      data:data
    });
    dialog.afterClosed().subscribe(res=>{
      if(res){
        // jika index=-1 (penambahan data baru) maka data diatambah
        if(index==-1)this.books.push(res);
        // jika tidak maka perbarui data
        else this.books[index]=data;
      }
    })
  }

  deleteProduct(index){
    var conf=confirm('Delete ini?');
    if(conf)
    this.books.splice(index,1)
  }
}
