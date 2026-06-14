import Ajv from 'ajv';
import authSchema    from '../schemas/authSchema.json';
import bookingSchema from '../schemas/bookingSchema.json';

const ajv = new Ajv();

export class SchemaValidator {

    static validateAuthResponse(data: unknown): boolean {
        const validate = ajv.compile(authSchema);
        const valid    = validate(data);
        if (!valid) console.error('Schema errors:', validate.errors);
        return valid as boolean;
    }

    static validateBookingResponse(data: unknown): boolean {
        const validate = ajv.compile(bookingSchema);
        const valid    = validate(data);
        if (!valid) console.error('Schema errors:', validate.errors);
        return valid as boolean;
    }
}