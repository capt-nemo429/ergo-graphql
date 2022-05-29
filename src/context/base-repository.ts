/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseEntity, DataSource, EntityTarget, Repository, SelectQueryBuilder } from "typeorm";
import GraphQLDatabaseLoader, {
  EjectQueryCallback,
  GraphQLQueryBuilder
} from "@mando75/typeorm-graphql-loader";
import { FindManyParams, FindOneParams, IRepository } from "./repository-interface";

export type RepositoryDataContext = {
  dataSource: DataSource;
  graphQLDataLoader: GraphQLDatabaseLoader;
};

export class BaseRepository<T extends BaseEntity> implements IRepository<T> {
  protected readonly repository!: Repository<T>;
  protected readonly dataSource!: DataSource;

  protected readonly createGraphQLQueryBuilder!: () => GraphQLQueryBuilder<any>;
  protected readonly alias!: string;

  private readonly baseFilters?: Partial<T>;

  constructor(
    entity: EntityTarget<T>,
    alias: string,
    context: RepositoryDataContext,
    baseFilter?: Partial<T>
  ) {
    this.alias = alias;
    this.dataSource = context.dataSource;
    this.repository = context.dataSource.getRepository(entity);
    this.createGraphQLQueryBuilder = () =>
      context.graphQLDataLoader.loadEntity(entity as any, alias);
    this.baseFilters = baseFilter;
  }

  protected createQueryBuilder(): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(this.alias);
  }

  public async find(options: FindManyParams<T>): Promise<T[]> {
    return this.findBase(options);
  }

  public async first(options: FindOneParams<T>): Promise<T | null> {
    return this.firstBase(options);
  }

  protected findBase(
    options: FindManyParams<T>,
    queryCallback?: EjectQueryCallback<T>
  ): Promise<T[]> {
    if (options.resolverInfo) {
      return this.createGraphQLQueryBuilder()
        .info(options.resolverInfo)
        .ejectQueryBuilder((query) => {
          query = query
            .where(this.createWhere(options.where))
            .skip(options.skip)
            .take(options.take);
          return queryCallback ? queryCallback(query) : query;
        })
        .loadMany();
    }

    const query = this.createQueryBuilder()
      .where(this.createWhere(options.where))
      .skip(options.skip)
      .take(options.take);
    return (queryCallback ? queryCallback(query) : query).getMany();
  }

  private createWhere(where?: Partial<T>): Partial<T> {
    if (this.baseFilters) {
      return { ...where, ...this.baseFilters };
    }

    return where || {};
  }

  protected firstBase(
    options: FindOneParams<T>,
    queryCallback?: EjectQueryCallback<T>
  ): Promise<T | null> {
    if (options.resolverInfo) {
      return this.createGraphQLQueryBuilder()
        .info(options.resolverInfo)
        .ejectQueryBuilder((query) => {
          query = query.where(this.createWhere(options.where));
          return queryCallback ? queryCallback(query) : query;
        })
        .loadOne();
    }

    const query = this.createQueryBuilder().where(this.createWhere(options.where));
    return (queryCallback ? queryCallback(query) : query).getOne();
  }
}
