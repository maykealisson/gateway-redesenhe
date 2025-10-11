import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestService {
  constructor(private readonly httpService: HttpService) {}

  public get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return lastValueFrom(
      this.httpService.get<T>(url, { headers }).pipe(
        map((response: AxiosResponse<T>) => response.data),
        catchError((error) => {
          if (error.response && error.response.data) {
            throw error.response.data;
          }
          throw error;
        }),
      ),
    );
  }

  public post<T>(
    url: string,
    body: any,
    headers?: Record<string, string>,
  ): Promise<T> {
    return lastValueFrom(
      this.httpService.post<T>(url, body, { headers }).pipe(
        map((response: AxiosResponse<T>) => response.data),
        catchError((error) => {
          if (error.response && error.response.data) {
            throw error.response.data;
          }
          throw error;
        }),
      ),
    );
  }

  public put<T>(
    url: string,
    body: any,
    headers?: Record<string, string>,
  ): Promise<T> {
    return lastValueFrom(
      this.httpService.put<T>(url, body, { headers }).pipe(
        map((response: AxiosResponse<T>) => response.data),
        catchError((error) => {
          if (error.response && error.response.data) {
            throw error.response.data;
          }
          throw error;
        }),
      ),
    );
  }

  public delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return lastValueFrom(
      this.httpService.delete<T>(url, { headers }).pipe(
        map((response: AxiosResponse<T>) => response.data),
        catchError((error) => {
          if (error.response && error.response.data) {
            throw error.response.data;
          }
          throw error;
        }),
      ),
    );
  }
}
