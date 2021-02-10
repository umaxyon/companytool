import * as Moxios from 'moxios';
import data_Schema from './serverdata/data_Schema';
import data_Master from './serverdata/data_Master';
import data_Login from 'src/test/serverdata/data_Login';
import data_ContractListTop from './serverdata/data_ContractListTop';
import data_ContractTop from './serverdata/data_ContractTop';
// import data_EmployeeListTop from './serverdata/data_EmployeeListTop';
// import data_EmployeeTop from './serverdata/data_EmployeeTop';

// const IS_MOCK = process.env.REACT_APP_API_URL === ''
const IS_MOCK = true;
const STUB_RESPONSE_MAP = {}

export const installStubRequestIfNeeded = (url: string) => {
    if (!IS_MOCK) {
        return
    }

    const stubRequest = findStubRequest(url)
    if (stubRequest != null && stubRequest[0]) {
        console.log('Handle mock request', stubRequest[0], stubRequest[1])
        Moxios.install()
        Moxios.stubRequest(stubRequest[0], stubRequest[1])
    }
}

export const uninstallStubRequestIfNeeded = () => {
    if (!IS_MOCK) {
        return
    }
    Moxios.uninstall()
}

function findStubRequest(url?: string): [string, any] {
    if (url) {
        const key = Object.keys(STUB_RESPONSE_MAP).find(k => url.startsWith(k))
        if (key != null) {
            return [key!, STUB_RESPONSE_MAP[key!]]
        }
    }
    return ["", {}];
}

const registerAll = () => {
    if (!IS_MOCK) {
        return
    }

    registerStub('/login', 200, { response: data_Login({}) })
    registerStub('/schema/employee', 200, { response: data_Schema({ context: 'employee' }) })
    registerStub('/schema/contract', 200, { response: data_Schema({ context: 'contract' }) })
    registerStub('/schema/supplier', 200, { response: data_Schema({ context: 'supplier' }) })
    registerStub('/master/all', 200, { response: data_Master({}) })


    registerStub('/contract/list?page=0&limit=100', 200, { response: data_ContractListTop({ page: 0, limit: 100 }) })
    registerStub('/contract/list?page=1&limit=100', 200, { response: data_ContractListTop({ page: 1, limit: 100 }) })
    registerStub('/contract/list?page=2&limit=100', 200, { response: data_ContractListTop({ page: 2, limit: 100 }) })
    // registerStub('/contract/list?', 401, {})

    const range = Array.from(new Array(255)).map((v: any, i: number) =>  i);
    for(const i of range) {
        registerStub(`/contract/detail/${i}`, 200, { response: data_ContractTop({ contractId: i }) });
    }

    // registerStub('/contract/detail/1', 200, { response: data_ContractTop({ contractId: 1 }) })
    // registerStub('/contract/detail/2', 200, { response: data_ContractTop({ contractId: 2 }) })
    // registerStub('/contract/detail/3', 200, { response: data_ContractTop({ contractId: 3 }) })
    // registerStub('/contract/detail/4', 401, {})

    // registerStub('/employee/list?num=0', 200, { response: data_EmployeeListTop({ num: 0 }) })
    // registerStub('/employee/list?num=10', 200, { response: data_EmployeeListTop({ num: 10 }) })
    // registerStub('/employee/list?num=20', 200, { response: data_EmployeeListTop({ num: 20 }) })
    // registerStub('/employee/list?num=30', 401, {})

    // registerStub('/employee/detail/0', 200, { response: data_EmployeeTop({ employeeId: 0 }) })
    // registerStub('/employee/detail/1', 200, { response: data_EmployeeTop({ employeeId: 1 }) })
    // registerStub('/employee/detail/2', 200, { response: data_EmployeeTop({ employeeId: 2 }) })
    // registerStub('/employee/detail/3', 200, { response: data_EmployeeTop({ employeeId: 3 }) })
    // registerStub('/employee/detail/4', 401, {})

    // registerStub('/contract/delete/0', 200, {})
    // registerStub('/contract/delete/1', 401, {})
    // registerStub('/employee/delete/0', 200, {})
    // registerStub('/employee/delete/1', 401, {})
    // registerStub('/supplier/delete/0', 200, {})
    // registerStub('/supplier/delete/1', 401, {})

    // registerStub('/contract/update/0', 200, {})
    // registerStub('/contract/update/1', 401, {})
    // registerStub('/employee/update/0', 200, {})
    // registerStub('/employee/update/1', 401, {})
    // registerStub('/supplier/update/0', 200, {})
    // registerStub('/supplier/update/1', 401, {})
}

interface Item {
    response?: any;
    responseText?: string;
    status?: number;
    statusText?: string;
    headers?: any;
}

const registerStub = (path: string, status: number, response: Item) => {
    const url = `${process.env.REACT_APP_API_URL}${path}`
    console.log(`stub request: ${url}`)
    STUB_RESPONSE_MAP[url] = response
}

registerAll()
