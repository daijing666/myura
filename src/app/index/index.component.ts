import { Component, OnInit, ViewChild } from '@angular/core';


/**
 * This is provided in the event
 * payload from the `ionChange` event.
 *
 * The value is an ISO-8601 date string.
 */


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {


  selectedDate: string | undefined;
  constructor() { }

  ngOnInit() { }



}
