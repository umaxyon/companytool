
export default (param: any) => {
    const range = Array.from(Array(param.num + 10)).slice(param.num);
    return range.map((v, i) => {
        if (i === 0) {
            return {
                employee_id: i,                       // 常駐契約ID (キー想定)
                name: `社員A_${i}`,               // 社員名
                cellphone_number: `0801111222${i}`,   // 携帯番号
                age: '36',                            // 年齢
                employee_type: '社員(その他)',                 // 雇用形態
                employee_type_value: 'staff_other',          // 雇用形態
                company_history: '10年',               // 社歴
                nearest_station: 'JR大阪駅',           // 最寄り駅
                extras: {}
            };
        } else if (i === 1) {
            return {
                employee_id: i,                       // 常駐契約ID (キー想定)
                name: `社員A_${i}`,               // 社員名
                cellphone_number: `0801111222${i}`,   // 携帯番号
                age: '36',                            // 年齢
                employee_type: '協力会社（社員）',       // 雇用形態
                employee_type_value: 'staff_other',   // 雇用形態
                company_history: '10年',               // 社歴
                nearest_station: 'JR大阪駅',           // 最寄り駅
            };
        } else if (i === 2) {
            return {
                employee_id: i,                       // 常駐契約ID (キー想定)
                name: `社員A_${i}`,               // 社員名
                cellphone_number: `0801111222${i}`,   // 携帯番号
                age: '36',                            // 年齢
                employee_type: '協力会社（社員）',     // 雇用形態
                employee_type_value: 'partner_staff',   // 雇用形態
                company_history: '10年',               // 社歴
                nearest_station: 'JR大阪駅',           // 最寄り駅
            };
        } else if (i === 3) {
            return {
                employee_id: i,                       // 常駐契約ID (キー想定)
                name: `社員A_${i}`,               // 社員名
                cellphone_number: `0801111222${i}`,   // 携帯番号
                age: '36',                            // 年齢
                employee_type: '協力会社（その他）',     // 雇用形態
                employee_type_value: 'partner_other', // 雇用形態
                company_history: '10年',               // 社歴
                nearest_station: 'JR大阪駅',           // 最寄り駅
            };
        }
        return {
            employee_id: i,                       // 常駐契約ID (キー想定)
            name: `社員A_${i}`,               // 社員名
            cellphone_number: `0801111222${i}`,   // 携帯番号
            age: '36',                            // 年齢
            employee_type: '社員(エンジニア)',      // 雇用形態
            employee_type_value: 'staff_engineer',// 雇用形態
            company_history: '10年',               // 社歴
            nearest_station: 'JR大阪駅',           // 最寄り駅
        };
    })
}