import { Component } from '@angular/core';

import { ElasticsearchService } from '../../../services/elasticsearch.service';
import { SearchParameter } from '../../../models/search-parameter';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  model = new SearchParameter(null, null);

  constructor(private elasticsearchService: ElasticsearchService) {}

  onSubmit() {
    this.elasticsearchService.search(
      this.model.area ? '('+ this.model.area + ') AND '　+ this.model.query : ''
       + this.model.query)
  }
}
