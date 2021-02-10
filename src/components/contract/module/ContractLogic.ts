import * as math from 'mathjs';
import * as moment from 'moment';
import { getFormData } from '../../../utils/FormDataUtil';


/**
 * 同一顧客継続年数からの％
 * 
 * (※計2) 同一顧客契約開始日が毎年4月1日時点でXヵ年以上でX%　(最大7%)
 * 例) 同一顧客契約開始日が
 * ・2018年4月2日の場合は0%
 * ・2018年4月1日の場合は1%
 * ・2017年4月1日の場合は2%
 * ・2011年4月1日の場合は7%
 * ・2010年4月1日の場合は7%
 */
export function calcSameClientPercentFromDuration(formData: any): any {
    const same_client_start_date = getFormData('employee_contract_same_client_start_date', formData);
    if (same_client_start_date) {
        if (moment(same_client_start_date).diff(moment()) < 0) { // 未来日は対象外
            const thisYear0401 = moment().month(3).date(1).hour(0).minutes(0).second(0); // 今年の4/1 (monthは1月ズレる)
            const diffY = moment(same_client_start_date).diff(thisYear0401, 'year');
            return Math.min(Math.abs(diffY), 7).toString();
        }
    }
    return '';
}

/**
 * 成果給率
 * 
 * ※ 成果給率は移行時条件がチェック時のみ直接入力
 * 
 * 移行時条件のチェックがない場合の計算式は以下の通り。
 * ベース成果給率 +  定期代からのマイナス% + 同一顧客継続年数からの% + 上長評価調整%
 * 
 * @param formData 
 */
export function calcPerformanceRate(formData: any, masterData: any) {
    const transition_condition = getFormData('employee_contract_transition_condition', formData);
    let basePaformance: any = '';
    // 移行時条件が未チェック
    if (!transition_condition) {
        basePaformance = getFormData('employee_contract_base_performance_rate', formData); // ベース成果給率
        const minus_percent_from_pass_price = getFormData('employee_contract_minus_percent_from_pass_price', formData); // 定期代からのマイナス％
        const same_client_percent_from_duration = getFormData('employee_contract_same_client_percent_from_duration', formData); // 同一顧客継続年数からの％
        const superior_evaluation_adjustment_percent = getFormData('employee_contract_superior_evaluation_adjustment_percent', formData); // 上長評価調整％

        // 全部入力されている場合
        if ((basePaformance) &&
            (minus_percent_from_pass_price || minus_percent_from_pass_price === 0) &&
            (same_client_percent_from_duration || same_client_percent_from_duration === 0) &&
            (superior_evaluation_adjustment_percent || superior_evaluation_adjustment_percent === 0)) {

            const v1 = masterData.base_performance_rate.find(((r: any) => r.value === basePaformance)).label.replace('%', '') || 0;
            const v2 = 0 - Math.abs(minus_percent_from_pass_price);
            const v3 = same_client_percent_from_duration.replace('%', '') || 0;
            const v4 = superior_evaluation_adjustment_percent.replace('%', '') || 0;

            return math.chain(math.bignumber(v1))
                .add(math.bignumber(v2))
                .add(math.bignumber(v3))
                .add(math.bignumber(v4)).done().toString();
        }
    }
    return ''
}

/**
 * 給料額
 * 
 * 基本給＋(単価×成果給率) ＋ roundup((基本給+(単価×成果給率))÷160×1.25×10,0)
 * 
 * 基本給は170,000円固定
 * 単価は「給料計算上の単価」と読み替え
 * 
 * @param formData 
 * @param performance_rate_payload
 */
export function calcSalaryAmount(formData: any, performance_rate_payload: any) {
    const unit_price_for_salary = getFormData('employee_contract_unit_price_for_salary', formData); // 給料計算上の単価
    const performance_rate = performance_rate_payload || getFormData('employee_contract_performance_rate', formData); // 成果給率

    if ((unit_price_for_salary || unit_price_for_salary === 0) && (performance_rate || performance_rate === 0)) {
        const perRate = math.bignumber(performance_rate).div(math.bignumber(100)); // 成果給率
        // 基本給 + (単価×成果給率)
        const buf = math.chain(math.bignumber(170000))
            .add(
                math.chain(math.bignumber(unit_price_for_salary)).multiply(perRate).done()
            ).done();

        // roundup((基本給+(単価×成果給率))÷160×1.25×10,0)
        const buf2 = math.chain(buf)
            .divide(160)
            .multiply(1.25)
            .multiply(10)
            .ceil().done();

        return buf.add(buf2).toString();
    }

    return ''
}