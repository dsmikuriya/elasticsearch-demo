import { Component, OnInit } from '@angular/core';

import { ElasticsearchService } from '../../../services/elasticsearch.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private elasticsearchService: ElasticsearchService) { }

  ngOnInit() {
  }

}
