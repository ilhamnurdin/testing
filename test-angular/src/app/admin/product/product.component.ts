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

  loading:boolean;

  getBooks(){
    this.loading=true;
    this.api.get('books').subscribe(res=>{
      this.books=res;
      this.loading=false;
    },error=>{
      this.loading=false;
      alert('Pengambilan Data Bermasalah, Try Again');
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

  lodingDelete:any={};

  deleteProduct(id,index){
    var conf=confirm('Delete ini?');
    if(conf){
      this.lodingDelete[index]=true;
      this.api.delete('books/'+id).subscribe(res=>{
        this.books.splice(index,1)
        this.lodingDelete[index]=false;
      },error=>{
        this.lodingDelete[index]=false;
        alert('Tidak Dapat menghapus data');
      });
    }

  }
}
