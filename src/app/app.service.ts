import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private options: object;

    constructor(private http: HttpClient) {
    }

    setOptions() {
        this.options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer caldrLkf7sMailrUz2LnFBbbzKa2B5xqQvJuyISaBqkHS2' +
                    'JAnKh6ozqMUqYGU_VojTGcg5eDoZUljG3LNEV7Vx2JCRtrHEKKSHjBJI0DP50WfWvnf7jfJD' +
                    '4xc-gQ59vS0i_BVHQG_14wkNwwwqg-NY1Rnh-jTn3YTK4WIgBYMfo44MpEzp9Y5qjTN2dchX' +
                    'D1zNsAQB3iFyDBn0cIXfqfL4ksGa4n5cO2-IaapFdLULq2CHiOceIm0zICSCKfHKZo4YKYqg' +
                    'ZN8W3JDDiNLDGqihKnS0N1SXNRuFTFtKCrQejYSm09kAP3GztEdQZSA3jSyBLH5WP9LwVQae' +
                    'UshKb-dt2STkNrNdc5iXGgnoFVKAGHDnVsV8tzQmwfetweRL99thKYnBMeEgl7nUdcXCfu4M' +
                    'cLVpUWWJHMi4zWpiCYHdvNfrwx9VE1ysFr6Tz_8W0IDTIu4p3-SsOkKpLPO0Nfh54LFVOfLu' +
                    'Jh-9RXuNL_wPTrKF8cuXmhvc31zPy4YDZ_i4SiiUvnC6nQDKhpkeHOEA',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
                'ClientID': 'b4abf19428864b1d93f9eea16bf5d040',
                'ClientLang': 'vi',
                'UID': 'a5bbd1f807b3c5e069a0f002a915abd9',
            })
        }
    }

    get(url: string) {
        return this.http.get(url).pipe(
            catchError(AppService.handleError)
        );
    }

    getCSV() {
        return this.http.get('assets/vpptanthinh.csv', {responseType: 'text'})
            .pipe(
                catchError(AppService.handleError)
            )
    }

    post(url: string, body?: any): Observable<any> {
        this.setOptions();
        return this.http.post<any>(url, body, this.options).pipe(
            catchError(AppService.handleError)
        );
    }

    private static handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
}
