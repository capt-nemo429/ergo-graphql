import GraphQLDatabaseLoader from "@mando75/typeorm-graphql-loader";
import { DataSource } from "typeorm";
import {
  BlockInfoEntity,
  BoxEntity,
  DataInputEntity,
  HeaderEntity,
  InputEntity,
  TokenEntity,
  TransactionEntity,
  UnconfirmedTransactionEntity
} from "../entities";
import { BaseRepository } from "./base-repository";
import { BoxRepository } from "./box-repository";
import { IRepository } from "./repository-interface";
import { TransactionRepository } from "./transactions-repository";
import { UnconfirmedTransactionRepository } from "./unconfirmed-transactions-repository";

export class DatabaseContext {
  public readonly transactions!: TransactionRepository;
  public readonly blockInfo!: IRepository<BlockInfoEntity>;
  public readonly boxes!: BoxRepository;
  public readonly dataInputs!: IRepository<DataInputEntity>;
  public readonly inputs!: IRepository<InputEntity>;
  public readonly headers!: IRepository<HeaderEntity>;
  public readonly tokens!: IRepository<TokenEntity>;

  public readonly unconfirmedTransactions!: UnconfirmedTransactionRepository;

  constructor(dataSource: DataSource) {
    const context = {
      dataSource,
      graphQLDataLoader: new GraphQLDatabaseLoader(dataSource)
    };

    this.transactions = new TransactionRepository(TransactionEntity, "tx", context);
    this.blockInfo = new BaseRepository(BlockInfoEntity, "block", context);
    this.boxes = new BoxRepository(BoxEntity, "box", context);
    this.dataInputs = new BaseRepository(DataInputEntity, "data-input", context);
    this.inputs = new BaseRepository(InputEntity, "input", context);
    this.headers = new BaseRepository(HeaderEntity, "header", context);
    this.tokens = new BaseRepository(TokenEntity, "token", context);

    this.unconfirmedTransactions = new UnconfirmedTransactionRepository(
      UnconfirmedTransactionEntity,
      "utx",
      context
    );
  }
}
