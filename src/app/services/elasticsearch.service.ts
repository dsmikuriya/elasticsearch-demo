import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import { Document } from '../models/document';

@Injectable()
export class ElasticsearchService {
  private apiUrl: string = 'http://localhost:9200/indexer01/sample/_search';

  private hits: number = 0;
  private docs: Document[] = [];

  constructor(private http: Http) { }

  getDocuments(): Document[] {
    return this.docs;
  }

  getHits(): number {
    return this.hits;
  }

  clear(): void {
    this.hits = 0;
    this.docs = [];
  }

  search(query): void {
    if (!query) {
      return;
    }

    this.clear();

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(
      this.apiUrl,
      {
        size: 30,
        from: 0,
        _source: ['question', 'answer', 'date'],
        query: {
          query_string: {
            query: query,
            fields: ['question'],
            default_operator: 'OR'
          }
        },
        highlight: {
          pre_tags: ['<b class="text-danger">'],
          post_tags: ['</b>'],
          fields: {
            question: { number_of_fragments: 0 }
          }
        }
      },
      { headers: headers }
    )
    .subscribe(res => {
      const data = res.json()

      this.hits = data.hits.total;
      
      data.hits.hits.forEach(doc => {
        this.docs.push(new Document(doc.highlight.question[0], doc._source.answer, doc._source.date, doc._score));
      })
    });
  }
}
