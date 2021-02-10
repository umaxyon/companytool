import * as moment from 'moment';
import { jsonMember, jsonObject } from 'typedjson';

const DATE_FORMAT = "Y年M月D日"

const displayDate = (dateString: string): string => {
    const day = moment(dateString)
    if (day.isValid()) {
        return day.format(DATE_FORMAT)
    }
    return ""
}

// 社員種別
export enum EmployeeType {
    staff = "0",
    staff_other = "1",
    partner_staff = "2",
    partner_contract_staff = "3",
    partner_freelance = "4",
}

// 評価
export enum EmployeeAssesment {
    excellence = "0", // 優秀
    usually = "1", // 普通
    dangerous = "2", // ヤバい
}

// 社員情報
@jsonObject
export class StaffInfo {
    @jsonMember({ constructor: String })
    public mail_address: string // メールアドレス
    @jsonMember({ constructor: String })
    public birthday: string // 生年月日
    @jsonMember({ constructor: String })
    public joined_route: string // 入社経路
    @jsonMember({ constructor: String })
    public hire_date: string; // 入社日
    @jsonMember({ constructor: String })
    public joining_conditions: string // 入社時の譲れない条件
    @jsonMember({ constructor: Number })
    public joining_administration_fee: number // 入社時の販売管理費
    @jsonMember({ constructor: Number })
    public joining_redemption_ratio: number // 入社時の還元率
    @jsonMember({ constructor: String })
    public retirement_date: string // 退職日
    @jsonMember({ constructor: String })
    public retirement_reason: string // 退職理由

    public displayBirthday = () => displayDate(this.birthday)

    // 社歴
    public displayCareer() {
        const hireDate = moment(this.hire_date)
        if (hireDate.isValid()) {
            const now = moment()
            const duration = moment.duration(now.diff(hireDate))
            const year = parseInt(String(duration.years()), 10)
            const month = parseInt(String(duration.months()), 10)
            const monthString = month !== 0 ? `${month}ヶ月` : ""
            return `${year}年${monthString}`
        }
        return ""
    }

    public displayJoiningAdministrationFee(): string {
        if (this.joining_administration_fee !== undefined) {
            return this.joining_administration_fee + "円"
        }
        return ""
    }

    public displayJoiningRedemptionRatio(): string {
        if (this.joining_redemption_ratio !== undefined) {
            return this.joining_redemption_ratio + "%"
        }
        return ""
    }
}

// 協力会社社員情報
@jsonObject
export class PartnerInfo {
    @jsonMember({ constructor: String })
    public company_name: string // 会社名
    @jsonMember({ constructor: String })
    public commercial_flow: string // 商流
    @jsonMember({ constructor: String })
    public age: string // 年齢
    @jsonMember({ constructor: String })
    public age_input_date: string // 年齢入力日
    @jsonMember({ constructor: String })
    public good_language: string // 得意言語
    @jsonMember({ constructor: String })
    public assessment: string // 評価

    public displayAgeInputDate = () => displayDate(this.age_input_date)

    public getAssesmentLabel() {
        switch (this.assessment) {
            case EmployeeAssesment.excellence:
                return "優秀"
            case EmployeeAssesment.usually:
                return "普通"
            case EmployeeAssesment.dangerous:
                return "ヤバい"
            default:
                return ""
        }
    }
}

// 社員詳細
@jsonObject
export class EmployeeInfo {
    @jsonMember({ constructor: String })
    public id: string;
    @jsonMember({ constructor: String })
    public employee_type: string;
    @jsonMember({ constructor: String })
    public name: string;
    @jsonMember({ constructor: String })
    public phonetic: string;
    @jsonMember({ constructor: String })
    public cellphone_number: string;
    @jsonMember({ constructor: Number })
    public age: number;
    @jsonMember({ constructor: String })
    public nearest_station: string
    @jsonMember({ constructor: String })
    public facebook_address: string
    @jsonMember({ constructor: String })
    public twitter_address: string
    @jsonMember({ constructor: String })
    public line_address: string
    @jsonMember({ constructor: String })
    public remarks: string // 備考
    @jsonMember({ constructor: String })
    public editor: string
    @jsonMember({ constructor: String })
    public register_date: string
    @jsonMember({ constructor: String })
    public update_date: string
    @jsonMember({ constructor: StaffInfo })
    public staff_info: StaffInfo;
    @jsonMember({ constructor: PartnerInfo })
    public partner_info: PartnerInfo;

    public isPartner() {
        switch (this.employee_type) {
            case EmployeeType.partner_staff:
            case EmployeeType.partner_contract_staff:
            case EmployeeType.partner_freelance:
                return true
            default:
                return false
        }
    }

    public displayRegisterDate = () => displayDate(this.register_date)

    public displayUpdateDate = () => displayDate(this.update_date)

    public getAge(): string {
        if (!this.isPartner()) {
            const birthday = this.staff_info.birthday
            const now = moment()
            const duration = moment.duration(now.diff(birthday))
            return String(parseInt(String(duration.as('years')), 10))
        } else {
            return this.partner_info.age
        }
    }

    public displayCareer() {
        if (!this.isPartner()) {
            return this.staff_info.displayCareer()
        }
        return ""
    }

    public getEmploymentStatusLabel() {
        switch (this.employee_type) {
            case EmployeeType.staff:
                return "社員"
            case EmployeeType.staff_other:
                return "社員(その他)"
            case EmployeeType.partner_staff:
                return "協力会社社員"
            case EmployeeType.partner_contract_staff:
                return "協力会社契約社員"
            case EmployeeType.partner_freelance:
                return "個人事業主"
        }
        return undefined
    }
}