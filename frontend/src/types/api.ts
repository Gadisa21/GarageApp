export interface LoginSuccessResponse {
    status: string;
    message: string;
    data: {
      token: string;
    };
  }
  
  export interface LoginErrorResponse {
    status: "Fail";
    message: string;
  }
  
  export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
  
  export interface Order {
  order_id: number;
  employee_id: number;
  customer_id: number;
  vehicle_id: number;
  order_date: string;
  active_order: number;
  order_hash: string;
  order_total_price: number;
  order_status: number;
  customer_email: string;
  customer_name: string;
  vehicle_model: string;
  vehicle_tag: string;
  }
  
  export interface OrderResponse{
    status: string;
    message: string;
    data?: Order[];
  }