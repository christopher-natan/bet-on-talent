// Participant entity mapped to the 'participants' table.
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'participants' })
export class Participant {
  // Auto-incremented primary key.
  @PrimaryGeneratedColumn()
  id: number;

  // Participant's first name (title-cased by service on create).
  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  // Participant's last name (title-cased by service on create).
  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  // Percentage of participation in the chart.
  @Column({ type: 'int' })
  participation: number;

  // Hex color stored as #RRGGBB; auto-assigned if not provided.
  @Column({ type: 'varchar', length: 7, nullable: true })
  color?: string | null;

  // Automatically managed timestamps.
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
