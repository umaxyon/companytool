
export default (param: any) => {
    const range = Array.from(Array(param.data.num + 10)).slice(param.data.num);
    return range.map((v, i) => {
        return {
            partner_id: i,                 // 常駐契約ID (キー想定)
            name: `顧客A顧客A顧客A_${i}`,      // 顧客名(契約に紐づく取引先情報のname)
            client_oropriety: '〇',        // 社員名(契約に紐づく社員情報のname)
            bp_oropriety: '×',             // 契約形態の表示名
        };
    })
}