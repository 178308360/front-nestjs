import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("project_permission", { schema: "front" })
export class ProjectPermission {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "project_id" })
  projectId: number;

  @Column("int", { name: "write", default: () => "'0'" })
  write: number;

  @Column("int", { name: "setting", default: () => "'0'" })
  setting: number;
}
