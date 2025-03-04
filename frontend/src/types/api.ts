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
  employee_name: string;

  }
            
           

  
  export interface OrderResponse{
    status: string;
    message: string;
    data?: Order[];
  }
  
  export interface customer{
    customer:{
    customer_id: number;
    customer_email: string;
    customer_phone_number: string;
    customer_added_date: string;
    customer_hash: string;
    customer_first_name: string;
    customer_last_name: string;
    active_customer_status: number;
    }
  }

export interface customerResponse{
  status: string;
  message: string;
  data?: customer;
} 


  export interface customersResponse{
    customers:customer[]

  }


  export interface vehicle{
    vehicle_id?: number;
   customer_id: number;
   vehicle_year: string;
    vehicle_make: string;
    vehicle_model: string;
    vehicle_type: string;
    vehicle_mileage: string;
    vehicle_tag: string;
    vehicle_serial: string;
    vehicle_color: string;
    active_vehicle: number;
  }

  export interface vehicleResponse{
    status: string;
    message: string;
    data?: vehicle[];
  }

  export interface service{
    service_id: number;
    service_name: string;
    service_description: string;
    
  }

  export interface serviceResponse{
    status: string;
    
    services: service[];
  }

  export interface orderService {
    service_id:number
  }

  export interface CreateOrderRequest{
    employee_id: number;
    customer_id: number;
    vehicle_id: number;
    additional_request?:string;
    order_total_price: number;
    order_services?: orderService[];
  }

  export interface AddCustomerRequest{
    customer_email: string;
    customer_phone_number: string;
    customer_first_name: string;
    customer_last_name: string;
  }

  

  export interface getCustomersResponse {
    totalCustomers: number;
    page: number;
    limit: number;
    customers: customer[];
  }

  export interface getVehiclePerCustomerResponse {
    status: string;
    message: string;
    data?: vehicle[];
  }
  
  