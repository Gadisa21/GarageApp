import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    employee_id: number;
    employee_email: string;
    employee_first_name: string;
    employee_role: number;
    token: string;
  }

  interface Session {
    user: {
      employee_id: number;
      employee_email: string;
      employee_first_name: string;
      employee_role: number;
      token: string;
    };
  }

  interface JWT {
    employee_id: number;
    employee_email: string;
    employee_first_name: string;
    employee_role: number;
    token: string;
  }
}