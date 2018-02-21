$(function () {
    //$( "#tabs" ).tabs();
    LoadListData();
    $("#btnAddNew").click(function () {
        ClearAddBox();

        $("#ID").val("0");

        $("#ui-id-1").html("Create Area");
        $("#btnSave").show();
        $("#btnDelete").hide();
        $("#btnUpdate").hide();
        $("#modalpopupAdd").dialog({ width: 650, minHeight: 300, modal: true });
    });
    $("#btnCloseAdd").click(function () {
        $("#modalpopupAdd").dialog('close');
        LoadListData();
    }
    );
});

$(function () {
    $("#btnSelect").click(function () {

        LoadListOfItem();
        $("#modalpopupAdd").dialog({ width: 1000, minHeight: 600, modal: true });

    });
});

function LoadListOfItem() {

    var url = "/Operation/ItemListForShopTransfer";

    if ($.fn.dataTable.isDataTable('#dataItemList')) {
        var tables = $('#dataItemList').DataTable();
        tables.destroy();
    }
    $('#dataItemList').dataTable({
        //"processing": true,
        //"serverSide":true,
        "ajax": {
            "url": url,
            "type": "POST"
        },
        "columns": [
            { "data": "PBarCode" },
            { "data": "DesignID" },
            { "data": "BrandID" },
            { "data": "SizeID" },
            { "data": "ColorID" },
            { "data": "ProductID" },
            { "data": "CategoryID" },
            { "data": "CostPrice" },
            { "data": "RetailPrice" },
            { "data": "WholeSalesPrice" },
            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                    return '<button type="button" id="btnFocus" onclick="LoadDetailsByPbarcode(\'' + data.PBarCode + '\');" class="btn btn-xs btn-info"><i class="fa fa-arrow-down"></i></button>';
                }
            }
        ]
    });
}


function LoadDetailsByPbarcode(parameter) {
    $.ajax({
        url: '/Operation/ItemReceiveByPBarcode',
        data: { 'PBarCode': parameter },
        success: function (data) {
            $("#txtItemId").val(data.data.ItemId);
            $("#txtPbarcode").val(data.data.PBarCode);
            $("#txtProductInfo").val(data.data.ProductInfo);
            $("#txtCostPrice").val(data.data.CostPrice);
            $("#txtSalesPrice").val(data.data.RetailPrice);
            $("#txtWSP").val(data.data.WholeSalesPrice);
            $("#modalpopupAdd").dialog('close');
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}

function ClearAddBox() {
    $("#SupplierID").val('0');
    $("#txtPbarcode").val('');
    $("#txtProductInfo").val('');
    $("#txtCostPrice").val('0');
    $("#txtSalesPrice").val('0');
    $("#txtQTY").val('0');
}

function LoadListData() {

    if ($.fn.dataTable.isDataTable('#dataList')) {
        var tables = $('#dataList').DataTable();
        tables.destroy();
    }
    $('#dataList').dataTable({
        "ajax": "/Operation/GrTempList",
        "columns": [

            { "data": "ItemID" },
            { "data": "Barcode" },
            { "data": "ProductInfo" },
            { "data": "CostPrice" },
            { "data": "RetailPrice" },
            { "data": "WholeSalesPrice" },
            { "data": "QTY" },
            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                    return '<button type="button" onclick="LoadForDelete(\'' + data.ItemID + '\');" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button>';
                }
            }
        ]
    });
}

$("#btnAdd").click(function () {

    var form = $("#formAdd");

    if ($("select[name='SupplierID'] option:selected").index() == 0) {
        alert('Please Select Supplier');
        return false;
    }

    var ratemaster = {
        "SupplierID": $("#SupplierID").val(),
        "Barcode": $("#txtPbarcode").val(),
        "QTY": $("#txtQTY").val(),
        "ItemId": $("#txtItemId").val(),
        "CostPrice": $("#txtCostPrice").val(),
        "RetailPrice": $("#txtSalesPrice").val(),
        "WholeSalesPrice": $("#txtWSP").val(),
        "ProductInfo": $("#txtProductInfo").val()

    };

    JsonData = JSON.stringify(ratemaster);
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/Operation/CreateGRTemp',
        data: JsonData,
        async: false,
        cache: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            LoadListData();
            alert('Save Successfully.');

            ClearAddBox();


            //LoadListData();
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});

$("#btnSave").click(function (e) {
    debugger;
    e.preventDefault();
    var selected = "";
    var rows = $("#dataList").dataTable().fnGetNodes();
    if (rows.length == 0) {
        return;
    }

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/Operation/CreateGRFinally',
        data: {},
        success: function (data) {
            //LoadDataList();
            //alert('save');
        },
        //error: function () {
        //    alert('An error occured try again later');
        //}
    });
    //LoadDataList();
});
