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
  