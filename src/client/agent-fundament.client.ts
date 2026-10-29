import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';
import {
  IAnaliseResumo,
  IAnaliseUpload,
  IRelatorioAnalise,
} from 'src/fundamento/model/fundamento.model';
import { AnaliseRequest } from 'src/fundamento/request/analise.request';

const TIMEOUT_PADRAO = 30000;
// O relatório consulta o Yahoo Finance e roda as engines de valuation/score
const TIMEOUT_RELATORIO = 120000;

@Injectable()
export class AgentFundamentClient {
  private baseURL = process.env.URL_AGENT_FUNDAMENT;

  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(AgentFundamentClient.name);

  public async enviarAnalise(
    ticker: string,
    body: AnaliseRequest,
  ): Promise<IAnaliseUpload> {
    return this.executar('Erro ao enviar análise', {
      method: 'POST',
      url: `/ativos/${encodeURIComponent(ticker)}/analises`,
      data: body,
    });
  }

  public async listarAnalises(ticker: string): Promise<IAnaliseResumo[]> {
    return this.executar('Erro ao buscar análises', {
      method: 'GET',
      url: `/ativos/${encodeURIComponent(ticker)}/analises`,
    });
  }

  public async gerarRelatorio(
    ticker: string,
    margemDesejada?: number,
  ): Promise<IRelatorioAnalise> {
    return this.executar('Erro ao processar análise', {
      method: 'GET',
      url: `/ativos/${encodeURIComponent(ticker)}/relatorio`,
      params:
        margemDesejada !== undefined
          ? { margem_desejada: margemDesejada }
          : undefined,
      timeout: TIMEOUT_RELATORIO,
    });
  }

  public async removerAnalise(id: number): Promise<void> {
    await this.executar('Erro ao remover análise', {
      method: 'DELETE',
      url: `/analises/${id}`,
    });
  }

  private async executar<T>(
    mensagemPadrao: string,
    config: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.request<T>({
          baseURL: this.baseURL,
          timeout: TIMEOUT_PADRAO,
          ...config,
        }),
      );
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError<{ detail?: unknown }>;
      const detail = axiosError.response?.data?.detail;
      this.logger.error(
        `${mensagemPadrao}: ${axiosError.response?.status ?? axiosError.code} ${JSON.stringify(detail ?? axiosError.message)}`,
      );
      // FastAPI responde { detail: string } ou, em erro de validação, { detail: [...] }
      throw new HttpException(
        typeof detail === 'string' ? detail : mensagemPadrao,
        axiosError.response?.status ?? 503,
      );
    }
  }
}
