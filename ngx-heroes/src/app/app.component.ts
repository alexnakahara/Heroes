import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  constructor(private http: HttpClient) { }
  ngOnInit() {
    // this.http.get<{a: number, b: number}>('https://localhost:44359/api/hero/teste').subscribe(resp => {

    //   // this.http.get('https://localhost:44359/api/hero/teste').subscribe(resp => {

    //   //   console.log(resp); com esse codigo simplificaria e nao precisaria colocar essse consoles

    //    console.log(resp.a.toFixed(0)); // fixa o valor da variavel a e b
    //    console.log(resp.a);
    //    console.log(resp.a.toString());

    //    console.log(resp.b.toFixed(0)); // fixa o valor da variavel a e b
    //    console.log(resp.b);
    //    console.log(resp.b.toString());
    // });
  }
}
