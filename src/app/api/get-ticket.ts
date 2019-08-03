export interface GetTicket {
    InputKhuyenMaiInfo: InputKhuyenMaiInfo;
    InputKhuyenMaiVeDetail: InputKhuyenMaiveDetail;
}

export interface InputKhuyenMaiInfo {
    KenhBanVe: string;
    MaCV: string;
}

export interface InputKhuyenMaiveDetail {
    GaDenKM: number;
    GaDiKM: number;
    GioDen: string;
    GioDi: string;
    MaGaDen: string;
    MaGaDi: string;
    MacTau: string;
    NgayDi: string;
    NgayXP: string;
}
