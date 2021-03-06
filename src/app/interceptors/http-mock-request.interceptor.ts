import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import * as users from '../data/users.json';

const urls = [
  {
    url: 'https://jsonplaceholder.typicode.com/users',
    json: users,
  },
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    for (const element of urls) {
      if (request.url === element.url) {
        console.log('Loaded from json : ' + request.url);
        return of(
          new HttpResponse({ status: 200, body: (element.json as any).default })
        );
      }
    }
    console.log('Loaded from http call :' + request.url);
    return next.handle(request);
  }
}
