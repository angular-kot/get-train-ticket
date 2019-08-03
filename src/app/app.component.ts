import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {AppConstants} from './app.constants';
import {FormTicket, GetTicket} from './api/get-ticket';
import {RailwayName, STATION_NAME} from './api/railway-name';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'get-ticket';
    data: GetTicket;
    private onFromInput: boolean;
    private formTicket: FormTicket;
    private resultStation: Array<RailwayName>;

    constructor(private appService: AppService) {
        this.formTicket = {
            from: undefined,
            to: undefined
        };
        this.data = {
            InputKhuyenMaiInfo: {KenhBanVe: 'WEB', MaCV: 'WEB'},
            InputKhuyenMaiVeDetail: {
                GaDenKM: 0,
                GaDiKM: 0,
                GioDen: undefined,
                GioDi: undefined,
                MaGaDen: undefined,
                MaGaDi: undefined,
                MacTau: 'SE9',
                NgayDi: '2019-08-03',
                NgayXP: '2019-08-03',
            }
        };
    }

    ngOnInit() {
    }

    firstGo() {
        // this.appService.get(AppConstants.DSVN).subscribe(result => {
        //     console.log(result);
        // }, err => {
        //     console.log(err);
        // });
    }

    getTicket(e: Event) {
        e.stopPropagation();
        this.appService.post(AppConstants.GET_TICKET, this.data).subscribe(result => {
            console.log(result);
        }, error => {
            console.log(error);
        });
    }

    searchStation(value: string, from?: true) {
        from ? this.onFromInput = true : this.onFromInput = false;
        this.resultStation = new Array<RailwayName>();
        STATION_NAME.forEach(item => {
            const result = item.SKeys.split(',')
                .find(name => (name.indexOf(value) !== -1));
            if (result) {
                this.resultStation.push(item);
            }
        });
    }

    setStation(e: Event, data: RailwayName, from?: boolean) {
        e.stopPropagation();
        this.resultStation = undefined;
        if (from) {
            this.formTicket.from = data.TenGa;
            return this.data.InputKhuyenMaiVeDetail.MaGaDi = data.MaGa;
        }
        this.formTicket.to = data.TenGa;
        return this.data.InputKhuyenMaiVeDetail.MaGaDen = data.MaGa;
    }

    resetSearchResult(e: Event) {
        e.stopPropagation();
        this.resultStation = undefined;
        if (this.formTicket.from || this.formTicket.to) {
            let fromFlag = false;
            let toFlag = false;
            STATION_NAME.forEach(item => {
                if (this.formTicket.from === item.TenGa) {
                    return fromFlag = true;
                }
                if (this.formTicket.to === item.TenGa) {
                    return toFlag = true;
                }
            });
            if (!fromFlag) {
                this.formTicket.from = '';
                this.data.InputKhuyenMaiVeDetail.MaGaDi = undefined;
            }
            if (!toFlag) {
                this.formTicket.to = '';
                this.data.InputKhuyenMaiVeDetail.MaGaDen = undefined;
            }
        }
    }

    showData(e: Event) {
        e.stopPropagation();
        console.log(this.data);
    }
}
