/// <reference path="site.common.js" />


//#region Notification 
function MakePagination(tableId) {
    $('#' + tableId).dataTable({
        "paging": true,
        "ordering": true,
        "info": true,
        "bDestroy": true
    });
}

function ShowNotification(type, message) {

    if (type != '0') {
        if (type == '1' || type=='success') {
            toastr.success(message);
        }
        else if (type == '2' || type == 'warning') {
            toastr.warning(message);
        }
        else if (type == '3' || type == 'error') {
            toastr.error(message);
        }
        else if (type == '4' || type == 'info') {
            toastr.info(message);
        }

    }
}

//#endregion


//#region Date Time Utility

function GetServerDateWithCallback(callback) {
    var date = "";
    var url = '/Common/GetServerDate';
    $.getJSON(url, {}, function (data) {
        date = data;
        callback(date);
    });
}

function GetServerDate() {
    var date = "";
    var url = '/Common/GetServerDate';
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        async: false,
        data: {
        },
        success: function (data) {
            date = data;
        },
        error: function () {
        }
    });
    return date;
}

function GetServerDateTime() {
    var date = "";
    var url = '/Common/GetServerDateTime';
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        async: false,
        data: {
        },
        success: function (data) {
            date = data;
        },
        error: function () {
        }
    });
    return date;
}

function GetFormatedDate(date) {

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '-' + month + '-' + year;

}

function FormatJsonDate(jsonDate) {

    var d = new Date(parseInt(jsonDate.slice(6, -2)));
    var date = d.getDate() + '-' + (1 + d.getMonth()) + '-' + d.getFullYear();
    return date;
}

function GetYearFromDate(jsonDate) {
    var d = new Date(parseInt(jsonDate.slice(6, -2)));
    return d.getFullYear();
}


function ConvertStringToDate(stringDate) {
    var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var data = stringDate.split('-');
    var day = data[0];
    var month = months.indexOf(data[1].toLowerCase());
    var year = data[2];
    return new Date(year, month, day).getTime();
}

function CreateDate(year, intMonth) {
    return new Date(year, intMonth - 1, 01).getTime();
}

function GetMonthName(monthNumber) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthNumber - 1];
}

function GetMonthNumber(monthName) {
    var month1 = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var month2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (monthName.length >= 3) {
        return month1.indexOf(monthName.toLowerCase());
    } else {
        return month2.indexOf(monthName.toLowerCase());
    }

}

//#endregion

//#region Format Staff PIN
function FormatStaffPin(controlId) {
    var inputStaffPin = $('#' + controlId).val();
    if (inputStaffPin) {
        var tempValue = "00000000" + inputStaffPin;
        var staffPin = tempValue.substring(tempValue.length - 8, tempValue.length);
        if (staffPin == "00000000") {
            $('#' + controlId).val('');
        } else {
            $('#' + controlId).val(staffPin);
        }

    }
}

//#endregion


//#region Get Staff 
function GetFormatedStaffPinWithStaffInformation(pin) {
    var staff = null;
    var formatedPin = "";
    var tempValue = "00000000" + pin;
    var staffPin = tempValue.substring(tempValue.length - 8, tempValue.length);
    if (staffPin != "00000000") {
        formatedPin = staffPin;
    }
    if (!formatedPin) {
        ShowNotification(2, "Invalid Staff PIN. Please check.....");
        return null;
    }

    var url = '/Common/GetStaffInformationByStaffPin';
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        async: false,
        data: {
            staffPin: formatedPin
        },
        success: function (data) {
            staff = data;

            if (data == null) {
                ShowNotification(2, "Invalid Staff PIN. Please check.....");
                staff = null;
                return null;
            }
            if (data == 0) {
                ShowNotification(2, "This Staff doesn't belong any HRMS Office. Please check......");
                staff = null;
                return null;
            }
            if (data == 1) {
                ShowNotification(2, "This Staff doesn't belong to this HRMS Office. Please check......");
                staff = null;
                return null;
            }

            if (data == 2) {
                ShowNotification(2, "This Staff (" + data.StaffName + ") is separated. Can't set monthly salary. Please check......");
                staff = null;
                return null;
            }

            if (data.JobStatusID != 'C' && data.JobStatusID != 'N') {
                ShowNotification(2, "This Staff (" + data.StaffName + ") has an invalid job status(" + data.JobStatusID + "). Please check......");
                staff = null;
                return null;
            }
        },
        error: function () {
        }
    });
    return staff;
}


function GetStaffInformation(pin) {
    var staff = null;
    var formatedPin = "";
    var tempValue = "00000000" + pin;
    var staffPin = tempValue.substring(tempValue.length - 8, tempValue.length);
    if (staffPin != "00000000") {
        formatedPin = staffPin;
    }
    if (!formatedPin) {
        ShowNotification(2, "Invalid Staff PIN. Please check.....");
        return null;
    }

    var url = '/Common/GetStaffInformationByStaffPin';
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        async: false,
        data: {
            staffPin: formatedPin
        },
        success: function (data) {
            staff = data;

            if (data == null) {
                ShowNotification(2, "Invalid Staff PIN. Please check.....");
                staff = null;
                return null;
            }
            if (data == 0) {
                ShowNotification(2, "This Staff doesn't belong any HRMS Office. Please check......");
                staff = null;
                return null;
            }
            if (data == 1) {
                ShowNotification(2, "This Staff doesn't belong to this HRMS Office. Please check......");
                staff = null;
                return null;
            }

            //if (data == 2) {
            //    ShowNotification(2, "This Staff (" + data.StaffName + ") is separated. Can't set monthly salary. Please check......");
            //    staff = null;
            //    return null;
            //}

            //if (data.JobStatusID != 'C' && data.JobStatusID != 'N') {
            //    ShowNotification(2, "This Staff (" + data.StaffName + ") has an invalid job status(" + data.JobStatusID + "). Please check......");
            //    staff = null;
            //    return null;
            //}
        },
        error: function () {
        }
    });
    return staff;
}



function GetLastMonthCloseGlobal() {
    var monthCloseGlobal = null;
    var url = '/Common/GetLastMonthCloseGlobal';
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        async: false,
        data: {
        },
        success: function (data) {
            monthCloseGlobal = data;
        },
        error: function () {
        }
    });
    return monthCloseGlobal;
}

function GetOpenMonthGlobal(year,month) {
    var monthCloseGlobal = null;
    var url = '/Common/GetOpenMonthGlobal';
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        async: false,
        data: {
            year: year,
            month: month
        },
        success: function (data) {
            monthCloseGlobal = data;
        },
        error: function () {
        }
    });
    return monthCloseGlobal;
}

function GetLastMonthClose() {
    var monthClose = null;
    var url = '/Common/GetLastMonthClose';
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        async: false,
        data: {
        },
        success: function (data) {
            monthClose = data;
        },
        error: function () {
        }
    });
    return monthClose;
}


function GetGlobalStaffPINSlot() {
    var pinSlot = null;
    var url = '/Common/GetGlobalStaffPINSlot';
    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        async: false,
        data: {
        },
        success: function (data) {
            pinSlot = data;
        },
        error: function () {
        }
    });
    return pinSlot;
}


//#endregion



//#region Validate Input
function decimal(e, ths) {
    var keynum;
    if (window.event) {
        keynum = e.keyCode;
    }
    else
        if (e.which) {
            keynum = e.which;
        }
    var tv = ths.value;
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        if (e.which != 46 && e.which != 110 && e.which != 190) {
            ShowNotification(2, 'Decimal value only.');
            return false;
        }
        var charExists = (tv.indexOf('.') >= 0) ? false : true;
        if (!charExists) return false;
    }
}

function ValidateYear(controlId) {
    var year = $('#' + controlId).val();
    if (year) {
        var filter = new RegExp("([1-2][0-9][0-9][0-9])");
        if (filter.test(year)) {
            
        } else {
            ShowNotification('2','Please enter valid year information.');
            $('#' + controlId).val('');
            $('#' + controlId).focus();
          
        }
    } else {
        $('#' + controlId).val('');
        $('#' + controlId).focus();
    }
   
}

//#endregion





//#region All Combo

function GetStringMonths(controlId, isDefaultRecordRequired) {
    var url = '/Common/GetStringMonths';
    var dataArray = '{}';
    var defaultString = '--- Select Month ---';
    CommonComboLoader(controlId, url, dataArray, isDefaultRecordRequired, defaultString);
}

//#endregion


//#region Common Combo Loader

function CommonComboLoader(controlId, url, dataArray, isDefaultRecordRequired, defaultString) {
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        data: dataArray,
        success: function (res) {
            var data = res;

            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (isDefaultRecordRequired) {
                if (defaultString) {
                    $("#" + controlId).get(0).options[0] = new Option(defaultString, "");
                } else {
                    $("#" + controlId).get(0).options[0] = new Option("---- Select -----", "");
                }
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.Text, item.Value);
                });
            }
        },
        error: function () {
        }
    });
}

//#endregion

/*  Get date difference
Returns difference in days, months, years based on given two inputs

How to call:
   for days: getDateDifference('01-Jan-2014', '30-Jun-2014', 'days')
   for months: getDateDifference('01-Jan-2014', '30-Jun-2014', 'months')
   for years: getDateDifference('01-Jan-2014', '30-Jun-2014', 'years')

*/
function getDateDifference(fromDate, toDate, types) {


    var fromDateV = fromDate.replace(/[#-]/g, '/');
    var fromDateF = new Date(fromDateV);

    var toDateV = toDate.replace(/[#-]/g, '/');
    var toDateF = new Date(toDateV);

    switch (types) {
        case "years":
            return toDateF.getFullYear() - fromDateF.getFullYear();
        case "months":
            return (parseInt(toDateF.getFullYear()) * 12 + parseInt(toDateF.getMonth()) + 1) - (parseInt(fromDateF.getFullYear()) * 12 + parseInt(fromDateF.getMonth()) + 1);
        case "days":
            return (toDateF - fromDateF) / (1000 * 60 * 60 * 24);
        default:
            return undefined;
    }
}

// Creating date fro string
function CreateDateFromString(date) {
    var dateV = date.replace(/[#-]/g, '/');
    var dateF = new Date(dateV);
    return dateF;
}

// Used for saving loan, dps, salary month close etc.
function ChecksalaryMonthCloseSecurity(user, password) {

    var isValid = null;
    var secPassword = null;
    if (user == 'user') {
        var url = '/Common/GetSpecialPassword';
        $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            async: false,
            data: {
            },
            success: function (data) {
                secPassword = data;
            },
            error: function () {
            }
        });


        if (password == secPassword) {
            isValid = true;
            
        }
        else {
            isValid = false;
        }
    }
    else {
        isValid = false;
    }

    return isValid;
}




function ShowLoader() {
    var width = window.outerWidth;
    var height = window.outerHeight;
    var w = (width / 2) - 450;
    var h = (height / 2) - 100;
    var div = '<div id="ICustomLoader" style="height:' + height + 'px; width:' + width + 'px;background-color:rgba(0,0,0,0.5);z-index:999999;top:0;bottom:0;right:0;left:0; position:fixed;">' +
        '<div class="ILoader " style="margin-left:' + w + 'px; margin-top:' + h + 'px ;"><p style="color:rgb(236,2,140); font-size:20px;text-align: center;line-height: 75px;"><img src="/Plugins/LoaderImages/39.GIF" style="background-color:"/><img> Please Wait..</p></div>' +
        '</div>';
    $('body').append(div);

    $('#ICustomLoader').on("contextmenu", function (e) {
        e.preventDefault();
    });
}//rgba(0,0,0,.6)

function HideLoader() {
    $('#ICustomLoader').remove();
}


// Replacing invalid characters
function ReplaceInvalidCharacter(invalidString) {
    var correctString = '';
    if (invalidString != '') {
        correctString = invalidString.replace(/'/g, " ");
    }
    return correctString;
}

function ChosenEventOnPageLoad() {
    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        '.chosen-select-width': { width: "95%" }
    };
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
}

