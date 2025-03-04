
export interface CustomerFormField {
    customer_email: string;
    customer_phone_number: string;
    customer_first_name: string;
    customer_last_name: string;
}





export interface customerUpdateForm{
    customer_id:number;
    customer_phone_number: string;
    customer_first_name: string;
    customer_last_name: string;
    customer_email: string;
    active_customer_status: boolean;

}

