
export default (param: any) => {

    // const limit = (param.url) ? param.url.split('?')[1].split('&')[1].split('=')[1] : '10';
    const limit = param.limit;
    const page = param.page;

    const range = Array.from(new Array(limit)).map((v: any, i: number) =>  i + (page * limit));

    const contract_list = range.map((i) => {
        if (i === 0) {
            return {
                contract_id: i,                // 常駐契約ID (キー想定)
                staff_name: `社員A`,  // 社員名(契約に紐づく社員情報のname)
                job_no: 'job0',             // JOB NO
                abbreviation: 'PFU略',   // 顧客名(契約に紐づく取引先情報のname)
                contract_type: '準委任',        // 契約形態の表示名(※汎用マスター管理希望。マスタ取得もしたい)
                start_date: '2018-11-28',      // 開始日
                end_date: '2019-03-26',        // 終了日
            }
        } else if (i === 1) {
            return {
                contract_id: i,                // 常駐契約ID (キー想定)
                staff_name: `外注さんB`,  // 社員名(契約に紐づく社員情報のname)
                job_no: 'job1',             // JOB NO
                abbreviation: 'PFU略',   // 顧客名(契約に紐づく取引先情報のname)
                contract_type: '準委任',        // 契約形態の表示名(※汎用マスター管理希望。マスタ取得もしたい)
                start_date: '2018-08-28',      // 開始日
                end_date: '2019-03-26',        // 終了日
            }
        } else if (i === 2) {
            return {
                contract_id: i,                // 常駐契約ID (キー想定)
                staff_name: `社員A`,  // 社員名(契約に紐づく社員情報のname)
                job_no: 'job2',             // JOB NO
                abbreviation: 'PFU略',   // 顧客名(契約に紐づく取引先情報のname)
                contract_type: '派遣',        // 契約形態の表示名(※汎用マスター管理希望。マスタ取得もしたい)
                start_date: '2018-08-01',      // 開始日
                end_date: '2019-04-18',        // 終了日
            }
        }

        return {
            contract_id: i,                // 常駐契約ID (キー想定)
            staff_name: `社員A_${i}`,  // 社員名(契約に紐づく社員情報のname)
            job_no: `job${i}`,             // JOB NO
            abbreviation: '顧客A',   // 顧客名(契約に紐づく取引先情報のname)
            contract_type: '準委任',        // 契約形態の表示名(※汎用マスター管理希望。マスタ取得もしたい)
            start_date: '2019-03-02',      // 開始日
            end_date: '2019-03-03',        // 終了日
        };
    })

    if (page === 2) {
        contract_list.splice(55, limit - 55);
    }
    return {
        "max_count": 255,
        "contract_list": contract_list,
    };
}