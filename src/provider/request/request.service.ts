import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class RequestService {
  constructor(private readonly httpService: HttpService) {}

  get<T>(
    url: string,
    headers?: Record<string, string>,
  ): Observable<AxiosResponse<T>> {
    return this.httpService.get<T>(url, { headers });
  }

  post<T>(
    url: string,
    body: any,
    headers?: Record<string, string>,
  ): Observable<AxiosResponse<T>> {
    return this.httpService.post<T>(url, body, { headers });
  }

  put<T>(
    url: string,
    body: any,
    headers?: Record<string, string>,
  ): Observable<AxiosResponse<T>> {
    return this.httpService.put<T>(url, body, { headers });
  }

  delete<T>(
    url: string,
    headers?: Record<string, string>,
  ): Observable<AxiosResponse<T>> {
    return this.httpService.delete<T>(url, { headers });
  }
}
