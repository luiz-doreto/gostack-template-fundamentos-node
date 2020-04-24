import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialValue: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    return this.transactions.reduce((acc, tr) => {
      acc[tr.type] += tr.value;
      acc.total = acc.income - acc.outcome;
      return acc;
    }, initialValue);

    // this.transactions.forEach(tr => {
    //   if (tr.type === 'income') {
    //     income += tr.value;
    //   } else {
    //     outcome += tr.value;
    //   }
    // });

    // total = income - outcome;

    // return {
    //   income,
    //   outcome,
    //   total,
    // };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
