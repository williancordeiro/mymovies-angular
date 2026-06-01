import { HttpErrorResponse } from "@angular/common/http";
import { ErrorsResponse } from "../models/errors-response";
import { throwError } from "rxjs";


export const handleError = (error: HttpErrorResponse) => {
    const errros: ErrorsResponse = error.error;
    return throwError(() => errros);
}