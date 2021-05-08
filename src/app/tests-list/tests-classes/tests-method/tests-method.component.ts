import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Test } from "../../model/baseTests";
@Component({
  selector: "app-tests-method",
  templateUrl: "./tests-method.component.html",
  styleUrls: ["./tests-method.component.css"]
})
export class TestsMethodComponent implements OnInit{
  @Input() Test:Test[];

  ngOnInit() {
    
  }
  
 
  constructor() {}

  
}
