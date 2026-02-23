import type { RowDataPacket } from "mysql2";

export interface Student extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number | null;
  course: string | null;
  year_level: number | null;
  gpa: number | null;
  enrollment_status: "Active" | "Inactive";
  created_at: string;
}