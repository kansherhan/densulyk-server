import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
    transform(value: string): Date {
        const date = new Date(value);

        if (!date) {
            throw new BadRequestException("Validation failed");
        }

        return date;
    }
}
