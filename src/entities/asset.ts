import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { BoxEntity } from "./box";
import { TokenEntity } from "./token";

/* 
  Schema
    TABLE node_assets
    token_id  VARCHAR(64) NOT NULL,
    box_id    VARCHAR(64) NOT NULL,
    header_id VARCHAR(64) NOT NULL,
    index     INTEGER     NOT NULL,
    value     BIGINT      NOT NULL,
    PRIMARY KEY (index, token_id, box_id, header_id)
*/

@Entity({ name: "node_assets" })
export class AssetEntity {
  @PrimaryColumn({ name: "token_id" })
  tokenId!: string;

  @Column({ name: "box_id" })
  boxId!: string;

  @Column({ name: "header_id" })
  blockId!: string;

  @Column({ name: "index" })
  index!: number;

  @Column({ name: "value", type: "bigint" })
  value!: bigint;

  @OneToOne(() => TokenEntity)
  @JoinColumn({ name: "token_id" })
  token!: TokenEntity;

  @ManyToOne(() => BoxEntity, (box) => box.assets)
  @JoinColumn({ name: "box_id" })
  box!: BoxEntity;
}
