export default (param: any) => {
    return {
        partner_id: `sup${param.partnerId}`,
        name: `顧客A_${param.partnerId}`,
        abbreviation: '顧A',
        client_oropriety: 'yes',
        bp_oropriety: 'yes',
        post_code: '1234567',
        address: '大阪府大阪市北区5-5-5',
        phone: '065842222',
        fax: '0642341123',
        website: 'http://panasonic.co.jp',
        number_of_employees: '5000',
        description: '説明\n説明\n説明\n\n\n',
        tdp_points: '3000',
        application_date: '2019-03-26',
        tdb_survey_date: '2019-03-18',
        terms_and_conditions: '取引条件など',
        kansai_employee: '3000',
        kansai_bp: '2000',
        editor: '更新者'
    }
}