import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {AppConstants} from "./app.constants";
import {GetTicket} from "./api/get-ticket";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'get-ticket';
    data: GetTicket;

    constructor(private appService: AppService) {
        this.data = {
            InputKhuyenMaiInfo: {KenhBanVe: "WEB", MaCV: "WEB"},
            InputKhuyenMaiVeDetail: {
                GaDenKM: 1726,
                GaDiKM: 0,
                GioDen: "02:47:00",
                GioDi: "14:30:00",
                MaGaDen: "SGO",
                MaGaDi: "HNO",
                MacTau: "SE9",
                NgayDi: "2019-08-03",
                NgayXP: "2019-08-03",
            }
        }
    }

    ngOnInit() {
        this.getTicket();
    }

    getTicket() {
        this.appService.post(AppConstants.GET_TICKET, this.data).subscribe(result => {
            console.log(result);
        }, error => {
            console.log(error);
        })
    }
}
