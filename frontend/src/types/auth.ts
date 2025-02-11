export interface DecodedToken {
empoyee_id: number;
employee_email: string;
employee_first_name: string;
empoyee_role: number;
}

export interface AuthState {
    employee_id: number | null;
    employee_email: string | null;
    employee_first_name: string | null;
    employee_role: string | null;
    token: string | null;
  }