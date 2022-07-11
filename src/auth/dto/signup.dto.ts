export class SignupDto {
    readonly full_name: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly address: {
        address1: string,
        address2: string,
        landmark?: string,
        city: string,
        pincode: number,
        state: string,
    }
}