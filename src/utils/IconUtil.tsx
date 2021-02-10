import * as React from 'react';
import TransferWithinAStation from '@material-ui/icons/TransferWithinAStation';
import AirlineSeatReclineNormal from '@material-ui/icons/AirlineSeatReclineNormal';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import WorkIcon from '@material-ui/icons/Work';

export function getContractTypeIcon(contractTypeValue: string) {
    console.log(contractTypeValue)
    if (contractTypeValue === 'temporary_agency_contract') {
        return (<AirlineSeatReclineNormal />)
    } else if (contractTypeValue === 'subcommission_contract') {
        return (<TransferWithinAStation />)
    }
    return undefined
}

export function getEmployeeTypeIcon(empType: string) {
    switch (empType) {
        case 'staff_engineer':
            return (<PersonIcon />)
        case 'staff_other':
            return (<WorkIcon />)
        default:
            return (<PersonOutlineIcon />)
    }
}
