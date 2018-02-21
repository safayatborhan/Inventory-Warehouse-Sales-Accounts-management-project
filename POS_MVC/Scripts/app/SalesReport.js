



$(document).ready(function () {
    LoadCustomerCombo("ddlCustomer");
    GetDataTable();

});

function GetDataTable() {
    $('#salesReportTableModal').DataTable({
        "jQueryUI": true,
        'ordering': true,
        'searching': true,
        'paging': false,
        //'order': [[0, 'desc']],
        'order': [[0, 'asc']],
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "/Sales/GetAllSales",
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [
            { "data": "SalesInvoice" },
            { "data": "SalesOrderId" },
            { "data": "Customer.Name" },
            { "data": "TotalAmount" },
            {
                 "data": "SalesDate",
                 'render': function (jsonDate) {
                     var date = new Date(parseInt(jsonDate.substr(6)));
                     var month = date.getMonth() + 1;
                     return month + "/" + date.getDate() + "/" + date.getFullYear();
                 }
            },
            { "data": "Notes" }

        ],
        
        "bDestroy": true,
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}

function GetDataForCustomer() {
    if ($("#ddlCustomer option:selected").val() == '') {
        GetDataTable();
    }
    else {
        GetDataTableForCustomer();
    }

}

function GetDataTableForCustomer() {
    $('#salesReportTableModal').DataTable({
        "jQueryUI": true,
        'ordering': true,
        'searching': true,
        'paging': false,
        //'order': [[0, 'desc']],
        'order': [[0, 'asc']],
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "/Sales/GetAllSalesFilteredByCustomer?id=" + $("#ddlCustomer option:selected").val(),
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [
            { "data": "SalesInvoice" },
            { "data": "SalesOrderId" },
            { "data": "Customer.Name" },
            { "data": "TotalAmount" },
            {
                "data": "SalesDate",
                'render': function (jsonDate) {
                    var date = new Date(parseInt(jsonDate.substr(6)));
                    var month = date.getMonth() + 1;
                    return month + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            { "data": "Notes" }

        ],
        "bDestroy": true,
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}

$("#btnAddSalesReport").click(function (e) {
    if ($("#dateFromDate").val() == "") {
        alert('From Date Is Empty.');
        return false;
    }

    if ($("#dateToDate").val() == "") {
        alert('To Date Is Empty.');
        return false;
    }
    if ($("#ddlCustomer option:selected").val() == '') {
        GetDataTableForDate();
    }

    if ($("#ddlCustomer option:selected").val() != '') {
        GetDataTableForDateAndCustomer();
    }
    
});

function GetDataTableForDate() {
    $('#salesReportTableModal').DataTable({
        "jQueryUI": true,
        'ordering': true,
        'searching': true,
        'paging': false,
        //'order': [[0, 'desc']],
        'order': [[0, 'asc']],
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "/Sales/GetAllSalesFilteredByDate?startDate=" + $("#dateFromDate").val() + "&endDate=" + $("#dateToDate").val(),
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [
            { "data": "SalesInvoice" },
            { "data": "SalesOrderId" },
            { "data": "Customer.Name" },
            { "data": "TotalAmount" },
            {
                "data": "SalesDate",
                'render': function (jsonDate) {
                    var date = new Date(parseInt(jsonDate.substr(6)));
                    var month = date.getMonth() + 1;
                    return month + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            { "data": "Notes" }

        ],
        "bDestroy": true,
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}

function GetDataTableForDateAndCustomer() {
    $('#salesReportTableModal').DataTable({
        "jQueryUI": true,
        'ordering': true,
        'searching': true,
        'paging': false,
        //'order': [[0, 'desc']],
        'order': [[0, 'asc']],
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "/Sales/GetAllSalesFilteredByDateAndCustomer?startDate=" + $("#dateFromDate").val() + "&endDate=" + $("#dateToDate").val() + "&customerId=" + $('#ddlCustomer').val(),
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [
            { "data": "SalesInvoice" },
            { "data": "SalesOrderId" },
            { "data": "Customer.Name" },
            { "data": "TotalAmount" },
            {
                "data": "SalesDate",
                'render': function (jsonDate) {
                    var date = new Date(parseInt(jsonDate.substr(6)));
                    var month = date.getMonth() + 1;
                    return month + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            { "data": "Notes" }

        ],
        "bDestroy": true,
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}

