import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {AppConstants} from './app.constants';
import {FormTicket, GetTicket} from './api/get-ticket';
import {RailwayName, STATION_NAME} from './api/railway-name';
import {PRODUCT} from "./api/product";

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
    private showData: any;

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
        this.convertFile();
    }

    private getTicket(e: Event) {
        e.stopPropagation();
        this.appService.post(AppConstants.GET_TICKET, this.data).subscribe(result => {
            console.log(result);
        }, error => {
            console.log(error);
        });
    }

    private searchStation(value: string, from?: true) {
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

    private setStation(e: Event, data: RailwayName, from?: boolean) {
        e.stopPropagation();
        this.resultStation = undefined;
        if (from) {
            this.formTicket.from = data.TenGa;
            return this.data.InputKhuyenMaiVeDetail.MaGaDi = data.MaGa;
        }
        this.formTicket.to = data.TenGa;
        return this.data.InputKhuyenMaiVeDetail.MaGaDen = data.MaGa;
    }

    private resetSearchResult(e: Event) {
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

    private convertFile() {
        this.appService.getCSV().subscribe(file => {
            let lines = file.split('\n');
            let result = new Array<any>();
            // let headers = lines[0].split(',');
            lines.forEach(line => {
                let current_line = line.split(',');
                let obj: PRODUCT = {
                    code: undefined,
                    name: undefined,
                    category: NaN,
                    group: undefined,
                    description: undefined,
                    min_quantity: NaN,
                    warehouse: undefined,
                    quantity: NaN,
                    total_price: NaN,
                    price: NaN,
                    photo: new Array<string>(),
                    tags: new Array<string>(),
                };
                Object.keys(obj).forEach((title, i) => {
                    if (title === 'name' || title === 'code' || title === 'description') {
                        return obj[title] = current_line[i];
                    }
                });
                result.push(obj);
            });
            result.splice(0, 1);
            this.showData = result;
            console.log(result);
        }, error => {
            console.log(error);
        });
    }

    private xoa_dau(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }
}
