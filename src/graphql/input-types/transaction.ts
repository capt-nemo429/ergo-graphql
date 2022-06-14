import { Field, InputType, Int } from "type-graphql";
import { TransactionInput } from "./transaction-input";
import { TransactionDataInput } from "./transaction-data-input";
import { TransactionOutput } from "./transaction-output";

@InputType("SignedTransaction")
export class SignedTransactionInput {
  @Field(() => String)
  id?: string;

  @Field(() => [TransactionInput])
  inputs!: TransactionInput[];

  @Field(() => [TransactionDataInput])
  dataInputs!: TransactionDataInput[];

  @Field(() => [TransactionOutput])
  outputs!: TransactionOutput[];

  @Field(() => Int, { nullable: true })
  size?: number;
}
