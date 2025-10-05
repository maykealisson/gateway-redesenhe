import { Test, TestingModule } from '@nestjs/testing';
import { InvestimentoService } from './investimento.service';

describe('InvestimentoService', () => {
  let service: InvestimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestimentoService],
    }).compile();

    service = module.get<InvestimentoService>(InvestimentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
