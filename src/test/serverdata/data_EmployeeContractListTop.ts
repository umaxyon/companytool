
export default (param: any) => {
    const range = Array.from(Array(param.num + 3)).slice(param.num);
    return range.map((v, i) => {
        return {
            "contract_id": "3c7655110a51cced109fb4d0",
            "partner_id": "2c7655110a51cced109fb4d0",
            "job_no": "job001",
            "contract_type": "派遣契約",
            "start_date": "2018-12-28",
            "end_date": "2019-12-28"
        }
    })
}