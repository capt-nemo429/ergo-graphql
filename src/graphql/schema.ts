import { join } from "path";
import { buildSchema, Int } from "type-graphql";
import { BigIntScalar } from "./scalars";
import { BoxResolver, TokenResolver, InputResolver, TransactionResolver } from "./resolvers";

export async function generateSchema() {
  const schema = await buildSchema({
    resolvers: [BoxResolver, TokenResolver, InputResolver, TransactionResolver],
    emitSchemaFile: join(process.cwd(), "src/graphql/schema.graphql"),
    dateScalarMode: "timestamp",
    validate: false,
    scalarsMap: [
      { type: Number, scalar: Int },
      { type: BigInt, scalar: BigIntScalar }
    ]
  });
  console.log("✅ GraphQL schema generated");

  return schema;
}
