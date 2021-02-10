export default (param: any) => {
    if (param.url) {
        const employeeId = param.url.split('/')[3];
        if (employeeId === '0') {
            return {
                employee_id: 'emp0',
                employee_type: 'partner_other',
                name: '社員A',
                phonetic: 'しゃいんえー',
                staff_info: {
                    mail_address: 'd-takachi@macasel.co.jp',
                    birthday: '1980-06-18',
                    joined_route: 'リクルート',
                    hire_date: '2015-08-12',
                    company_history: '3年7ヵ月',
                    joining_conditions: '入社時の譲れない条件',
                    base_performance_rate: 'twenty_three_percent',
                    retirement_date: '2019-03-07',
                    retirement_reason: '退職理由\n退職理由\n退職理由'
                },
                cellphone_number: '08011112222',
                nearest_station: '大阪駅',
                partner_info: {
                    age: '38歳',
                    company_name: '日立',
                    good_language: 'Java',
                    assessment: 'excellence',
                },
                facebook_address: 'Facebookアドレス',
                twitter_address: 'Twitterアドレス',
                line_address: 'LiNEアドレス',
                remarks: '備考\n備考\n備考',
                editor: '更新者'
            }
        }
    }


    return {
        employee_id: `emp${param.employeeId}`,
        employee_type: 'staff_engineer',
        name: `社員A_${param.employeeId}`,
        phonetic: 'しゃいんえー',
        staff_info: {
            mail_address: 'd-takachi@macasel.co.jp',
            birthday: '1980-02-01',
            joined_route: 'リクルート',
            hire_date: '2015-08-12',
            company_history: '',
            joining_conditions: '入社時の譲れない条件',
            base_performance_rate: 'twenty_three_percent',
            retirement_date: '2019-03-07',
            retirement_reason: '退職理由\n退職理由\n退職理由'
        },
        cellphone_number: '08011112222',
        nearest_station: '大阪駅',
        partner_info: {
            age: '',
            company_name: '日立',
            good_language: 'Java',
            assessment: 'excellence'
        },
        facebook_address: 'Facebookアドレス',
        twitter_address: 'Twitterアドレス',
        line_address: 'LiNEアドレス',
        remarks: '備考\n備考\n備考',
        editor: '更新者'
    }
}