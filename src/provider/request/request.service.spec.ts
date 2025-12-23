import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('RequestService', () => {
  let service: RequestService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<RequestService>(RequestService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('get', () => {
    it('deve realizar uma requisição GET', async () => {
      const response: AxiosResponse = {
        data: { test: 'data' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };
      mockHttpService.get.mockReturnValue(of(response));

      const result = await service.get('http://test.com');

      expect(result).toEqual(response.data);
      expect(httpService.get).toHaveBeenCalledWith('http://test.com', { headers: undefined });
    });
  });

  describe('post', () => {
    it('deve realizar uma requisição POST', async () => {
      const response: AxiosResponse = {
        data: { test: 'data' },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {
          headers: undefined
        },
      };
      mockHttpService.post.mockReturnValue(of(response));

      const result = await service.post('http://test.com', { data: 'test' });

      expect(result).toEqual(response.data);
      expect(httpService.post).toHaveBeenCalledWith('http://test.com', { data: 'test' }, { headers: undefined });
    });
  });

  describe('put', () => {
    it('deve realizar uma requisição PUT', async () => {
      const response: AxiosResponse = {
        data: { test: 'data' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };
      mockHttpService.put.mockReturnValue(of(response));

      const result = await service.put('http://test.com', { data: 'test' });

      expect(result).toEqual(response.data);
      expect(httpService.put).toHaveBeenCalledWith('http://test.com', { data: 'test' }, { headers: undefined });
    });
  });

  describe('delete', () => {
    it('deve realizar uma requisição DELETE', async () => {
      const response: AxiosResponse = {
        data: { test: 'data' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };
      mockHttpService.delete.mockReturnValue(of(response));

      const result = await service.delete('http://test.com');

      expect(result).toEqual(response.data);
      expect(httpService.delete).toHaveBeenCalledWith('http://test.com', { headers: undefined });
    });
  });
});
