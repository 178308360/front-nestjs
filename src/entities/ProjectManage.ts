import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("project_manage", { schema: "front" })
export class ProjectManage {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("char", { name: "project_name", length: 255 })
  projectName: string;

  @Column("int", { name: "creator" })
  creator: number;

  @Column("char", { name: "descr", nullable: true, length: 255 })
  descr: string | null;

  @Column("datetime", { name: "createdAt", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "updatedAt", nullable: true })
  updatedAt: Date | null;
}
