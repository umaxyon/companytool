
export default (param: any) => {
    const range = Array.from(Array(param.num + 3)).slice(param.num);
    return range.map((v, i) => {
        return {
            "contract_id": "3c7655110a51cced109fb4d0",
            "employee_id": "5c7655110a51cced109fb4d0",
            "contract_type": "派遣契約"
        }
    })
}