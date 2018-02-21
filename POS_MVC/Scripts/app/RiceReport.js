

$(document).ready(function () {
    LoadSupplierCombo("ddlSupplier");
    LoadAllWareHouse("ddlWarehouse");
    GetDataTable();

});

function GetDataTable() {
    $('#inventoryPaddyReportTableModal').DataTable({
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "/Inventory/GetAllRice",
            "dataSrc": function (json) {
                console.log(json);
                return json;
            }
        },
        "columns": [
            { "data": "Product.ProductName" },
            { "data": "WareHouse.WareHouseName" },
            { "data": "QtyInBale" },
            { "data": "BalanceQty" },
            { "data": "BalanceQtyInKG" }


        ],
        "bDestroy": true,
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}

function GetDataForSupplier() {
    console.log($("#ddlSupplier option:selected").val());
    if ($("#ddlSupplier option:selected").val() == '') {
        GetDataTable();
    }
    else {
        GetDataTableForSupplier();
    }

}

function GetDataForWarehouse() {
    console.log($("#ddlWarehouse option:selected").val());
    if ($("#ddlWarehouse option:selected").val() == '') {
        GetDataTable();
    }
    else {
        GetDataTableForWarehouse();
    }

}

function GetDataTableForSupplier() {
    $('#inventoryPaddyReportTableModal').DataTable({
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "/Inventory/GetAllRiceFilteredBySupplier?id=" + $("#ddlSupplier option:selected").val(),
            "dataSrc": function (json) {
                console.log(json);
                return json;
            }
        },
        "columns": [
            { "data": "Product.ProductName" },
            { "data": "WareHouse.WareHouseName" },
            { "data": "QtyInBale" },
            { "data": "BalanceQty" },
            { "data": "BalanceQtyInKG" }

        ],
        "bDestroy": true,
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}

function GetDataTableForWarehouse() {
    $('#inventoryPaddyReportTableModal').DataTable({
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "/Inventory/GetAllRiceFilteredByWarehouse?id=" + $("#ddlWarehouse option:selected").val(),
            "dataSrc": function (json) {
                console.log(json);
                return json;
            }
        },
        "columns": [
            { "data": "Product.ProductName" },
            { "data": "WareHouse.WareHouseName" },            
            { "data": "QtyInBale" },
            { "data": "BalanceQty" },
            { "data": "BalanceQtyInKG" }


        ],
        "bDestroy": true,
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}