import { Test, TestingModule } from '@nestjs/testing';
import { InvestimentoController } from './investimento.controller';

describe('InvestimentoController', () => {
  let controller: InvestimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestimentoController],
    }).compile();

    controller = module.get<InvestimentoController>(InvestimentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
