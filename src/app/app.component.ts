import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {AppConstants} from './app.constants';
import {FormTicket, GetTicket} from './api/get-ticket';
import {RailwayName} from './api/railway-name';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'get-ticket';
    data: GetTicket;
    private formTicket: FormTicket;

    constructor(private appService: AppService) {
        this.formTicket = {
            from: undefined,
            to: undefined
        };
        this.data = {
            InputKhuyenMaiInfo: {KenhBanVe: 'WEB', MaCV: 'WEB'},
            InputKhuyenMaiVeDetail: {
                GaDenKM: 1726,
                GaDiKM: 0,
                GioDen: '02:47:00',
                GioDi: '14:30:00',
                MaGaDen: 'SGO',
                MaGaDi: 'HNO',
                MacTau: 'SE9',
                NgayDi: '2019-08-03',
                NgayXP: '2019-08-03',
            }
        };
    }

    ngOnInit() {
        this.firstGo();
        this.getTicket();
    }

    firstGo() {
        // this.appService.get(AppConstants.DSVN).subscribe(result => {
        //     console.log(result);
        // }, err => {
        //     console.log(err);
        // });
    }

    getTicket() {
        this.appService.post(AppConstants.GET_TICKET, this.data).subscribe(result => {
            console.log(result);
        }, error => {
            console.log(error);
        });
    }

    searchStation(value) {
        const station = [];
        RailwayName.forEach(item => {
            const result = item.SKeys.split(',')
                .find(name => (name.indexOf(value) !== -1));
            if (result) {
                station.push(item);
            }
        });
    }

    showData(e: Event) {
        e.stopPropagation();
        console.log(this.data);
    }
}
