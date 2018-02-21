

var detailsStockOut = [];
var detailsStockIn = [];
var datatableRowCount = 0;

$(document).ready(function () {
    LoadInvoiceNo("txtPoNo");
    LoadAllProduct();
    LoadInventoryList();

    var templateWithData = Mustache.to_html($("#templateStockOutModal").html(), { StockTableAdd: detailsStockOut });
    $("#div-stockOut-add").empty().html(templateWithData);
});


$("#btnAdd").click(function () {
    //var Id = $("#ddlItem option:selected").val();
    //var Id = datatableRowCount++;
    var item = $("#ddlItem option:selected").text();
    var ProductId = $("#ddlItem option:selected").val();
    var WarehouseId = $("#ddlWareHouse option:selected").val();
    var WarehouseName = $("#ddlWareHouse option:selected").text();
    var BaleQty = $("#txtBaleQty").val();
    var BaleWeight = $("#txtBaleWeight").val();
    var WeightInMon = $("#txtWeightInMon").val();
    var object = {
        Item: item, ProductId: ProductId, WarehouseId: WarehouseId,
        WarehouseName: WarehouseName, BaleQty: BaleQty, BaleWeight: BaleWeight,
        WeightInMon: WeightInMon
    };
    console.log(object);
    detailsStockOut.push(object);
    var templateWithData = Mustache.to_html($("#templateStockOutModal").html(), { StockTableAdd: detailsStockOut });
    $("#div-stockOut-add").empty().html(templateWithData);
});

function OnDeleteStockOut(Id) {
    console.log(Id);
    detailsStockOut.splice(Id, 1);
    datatableRowCount--;
    var templateWithData = Mustache.to_html($("#templateStockOutModal").html(), { StockTableAdd: detailsStockOut });
    $("#div-stockOut-add").empty().html(templateWithData);
}


function LoadAllProduct() {
    var url = "/Product/GetAll";
    $.ajax({
        url: url,
        method: "POST",
        success: function (res) {
            var data = res;
            //alert('Success');
            var controlId = "ddlItem";
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("-পছন্দ করুন-", "-1");
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.ProductName, item.Id);
                });
            }
        },
        error: function () {
        }
    });

}


function LoadInvoiceNo(controlId) {
    var url = "/ProductionProcessing/GetInvoiceNumberForStockIn";
    $.ajax({
        url: url,
        method: "POST",
        success: function (res) {
            var data = res;
            console.log(data);
            $("#" + controlId).val(data);
        },
        error: function () {
        }
    });
}


function Save() {
    GetDataFromDatatable();
    var url = '/ProductionProcessing/SaveStockIn';
    $.ajax({
        url: url,
        method: 'POST',
        data: {
            InvoiceNo: $("#txtPoNo").val(),
            //SupplierId: $("#ddlSupplier option:selected").val(),
            Notes: $("#txtDescriptions").val(),
            stockIns: detailsStockIn
        },
        success: function (data) {
            ShowNotification("1", "Stock In Saved!!");
            $('#StockTableAdd').val("");
        },
        error: function () {
        }
    });

}

function LoadInventoryList() {
    var url = '/ProductionProcessing/GetProductForStockIn';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var templateWithData = Mustache.to_html($("#templateInventoryGroupModal").html(), { InventoryGroupSearch: res });
            $("#div-inventoryGroup").empty().html(templateWithData);
            MakePagination('inventoryGroupTableModal');
        },
        error: function (error, r) {
            ShowNotification("3", "Something Wrong!!");
        }
    });
}


function LoadForAdd(parameters) {
    $.ajax({
        url: '/ProductionProcessing/InventoryDetails',
        data: { 'id': parameters },
        success: function (data) {
            //var Id = datatableRowCount++;
            var ProductId = data.ProductId;
            var WarehouseId = data.WarehouseId;            
            var BaleQty = $("#txtReceiveQty").val();
            var BaleWeight = data.QtyInBale;
            var WeightInMon = data.QtyInBale;
            var SupplierId = data.SupplierId;

            var Product = data.Product;
            var Supplier = data.Supplier;
            var WareHouse = data.WareHouse;

            var object = {
                ProductId: ProductId, WarehouseId: WarehouseId,
                BaleQty: BaleQty, BaleWeight: BaleWeight,
                WeightInMon: WeightInMon, SupplierId: SupplierId, Product: Product,
                Supplier: Supplier, WareHouse: WareHouse
            };
            detailsStockOut.push(object);
            console.log(data);
            var templateWithData = Mustache.to_html($("#templateStockOutModal").html(), { StockTableAdd: detailsStockOut });
            $("#div-stockOut-add").empty().html(templateWithData);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}


function GetDataFromDatatable() {
    $('#inventoryGroupTableModal tr').each(function(i) {
        if (i > 0) {
            var ProductId = $(this).find('td').eq(0).text();
            var BaleQty = $(this).find('td').eq(2).find('input').val();
            var BaleWeight = $(this).find('td').eq(3).find('input').val();
            var WeightInMon = $(this).find('td').eq(4).find('input').val();
            var WarehouseId = $(this).find('td').eq(5).find('select').val();
            var SupplierId = $("#ddlSupplier option:selected").val();
            //var SupplierId = GetSupplierId(ProductId);

            var object = {
                ProductId: ProductId,
                WarehouseId: WarehouseId,
                BaleQty: BaleQty,
                BaleWeight: BaleWeight,
                WeightInMon: WeightInMon,
                SupplierId: SupplierId
            };

            detailsStockIn.push(object);
            console.log(detailsStockIn);

        }
    });
}

function GetSupplierId(parameters) {
    var supplierId = '';
    $.ajax({
        url: '/Inventory/GetSupplierId',
        data: { 'id': parameters },
        success: function(data) {
            supplierId = data.SupplierId;
        }
    });
    return supplierId;
}