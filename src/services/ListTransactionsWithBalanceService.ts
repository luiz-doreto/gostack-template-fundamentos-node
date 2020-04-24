import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionsWithBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Response {
    const response: Response = {
      transactions: this.transactionsRepository.all(),
      balance: this.transactionsRepository.getBalance(),
    };

    return response;
  }
}

export default ListTransactionsWithBalanceService;
