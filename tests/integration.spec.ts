import "dotenv/config";
import "reflect-metadata";
import "../src/prototypes";

import { ApolloServer } from "apollo-server-express";
import { GraphQLResponse } from "apollo-server-types";
import { initializeDataSource } from "../src/data-source";
import { generateSchema } from "../src/graphql/schema";
import { DatabaseContext } from "../src/context/database-context";
import { DataSource } from "typeorm";

type Spec = {
  name: string;
  query: { query: string; variables?: object };
  assert: (output: GraphQLResponse) => void;
};

const specs: Spec[] = [
  {
    name: "[addresses] balance and transactions count",
    query: {
      query: `query Query($addresses: [String!]!, $atHeight: Int) {
        addresses(addresses: $addresses, atHeight: $atHeight) {
          transactionsCount
          balance { 
            nanoErgs 
            assets { tokenId }
          }
        }
      }`,
      variables: {
        addresses: [
          "9hY16vzHmmfyVBwKeFGHvb2bMFsG94A1u7To1QWtUokACyFVENQ",
          "9fh7mb1w4mFpD9aZDs8atNjnp27xN1HQnsgQk1cRiPaeCWMCfRJ",
          "9gT3jR5PU9QKrgDuZJ6tKNpoCUwsGPhV6uVg6SL2hmdZGWicq9m"
        ],
        atHeight: 759893
      }
    },
    assert(output) {
      expect(output.errors).toBeUndefined();
      expect(output.data).toBeDefined();
      expect(output.data?.addresses).toHaveLength(3);
      if (!output.data) {
        return;
      }

      for (const address of output.data.addresses) {
        if (address.address === "9hY16vzHmmfyVBwKeFGHvb2bMFsG94A1u7To1QWtUokACyFVENQ") {
          expect(address.transactionsCount).toEqual(167);
          expect(address.balance.nanoErgs).toEqual(1723811075n);
          expect(address.balance.assets).toHaveLength(18);
        } else if (address.address === "9fh7mb1w4mFpD9aZDs8atNjnp27xN1HQnsgQk1cRiPaeCWMCfRJ") {
          expect(address.transactionsCount).toEqual(0);
          expect(address.balance.nanoErgs).toEqual(0n);
          expect(address.balance.assets).toHaveLength(0);
        } else if (address.address === "9gT3jR5PU9QKrgDuZJ6tKNpoCUwsGPhV6uVg6SL2hmdZGWicq9m") {
          expect(address.balance.nanoErgs).toEqual(87680777n);
        }
      }
    }
  },
  {
    name: "[transactions] filter by address and height",
    query: {
      query: `query Query($address: String, $maxHeight: Int) {
        transactions(address: $address, maxHeight: $maxHeight) {
          inclusionHeight
          transactionId
        }
      }`,
      variables: {
        address: "9i2bQmRpCPLmDdVgBNyeAy7dDXqBQfjvcxVVt5YMzbDud6AvJS8",
        maxHeight: 759893
      }
    },
    assert(output) {
      expect(output.errors).toBeUndefined();
      expect(output.data).toBeDefined();
      expect(output.data?.transactions).toHaveLength(4);
    }
  },
  {
    name: "[transactions] no filters",
    query: {
      query: `query Query($take: Int) {
        transactions(take: $take) {
          inclusionHeight
          transactionId
        }
      }`,
      variables: {
        take: 10
      }
    },
    assert(output) {
      expect(output.errors).toBeUndefined();
      expect(output.data).toBeDefined();
      expect(output.data?.transactions).toHaveLength(10);
    }
  }
];

describe("integration tests", () => {
  let server!: ApolloServer;
  let dataSource!: DataSource;

  beforeAll(async () => {
    const [data, schema] = await Promise.all([initializeDataSource(), generateSchema()]);
    dataSource = data;
    server = new ApolloServer({
      schema,
      context: { repository: new DatabaseContext(dataSource) }
    });
  });

  afterAll(() => {
    server.stop();
    dataSource.destroy();
  });

  for (const spec of specs) {
    it(spec.name, async () => {
      const response = await server.executeOperation({ ...spec.query });
      spec.assert(response);
    });
  }
});
