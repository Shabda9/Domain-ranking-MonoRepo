import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'rankings' })
export class Ranking extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  domain: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rank: number;
}
