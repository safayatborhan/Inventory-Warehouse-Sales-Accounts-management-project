

var detailsStockOut = [];
var datatableRowCount = 0;

$(document).ready(function () {
    LoadInvoiceNo("txtPoNo");
    LoadAllProduct();
    LoadAllWareHouse("ddlWareHouse");
    //LoadSupplierCombo("ddlSupplier");

    LoadInventoryList();

    var templateWithData = Mustache.to_html($("#templateStockOutModal").html(), { StockTableAdd: detailsStockOut });
    $("#div-stockOut-add").empty().html(templateWithData);
});


$("#btnAdd").click(function () {
    var msg = '';
    $(this).closest('tr').find('input').each(function () {
        msg += $(this).val() + '\n';
    });
    console.log(msg);
    alert(msg);
});

function OnDeleteStockOut(Id) {
    for (var i = 0; i < detailsStockOut.length; i++) {
        if (detailsStockOut[i].inventoryCountCount == Id) {
            detailsStockOut.splice(i, 1);
        }
    }
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
    var url = "/ProductionProcessing/GetInvoiceNumber";
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
    var url = '/ProductionProcessing/Save';
    $.ajax({
        url: url,
        method: 'POST',
        data: {
            InvoiceNo: $("#txtPoNo").val(),            
            //SupplierId: $("#ddlSupplier option:selected").val(),
            Notes: $("#txtDescriptions").val(),
             stockOuts: detailsStockOut
        },
        success: function (data) {
            ShowNotification("1", "Stock Out Saved!!");
            detailsStockOut = [];
            var templateWithData = Mustache.to_html($("#templateStockOutModal").html(), { StockTableAdd: detailsStockOut });
            $("#div-stockOut-add").empty().html(templateWithData);

            var table = $('#templateInventoryGroupModal').DataTable();
            table.destroy();
        },
        error: function () {
        }
    });

}


function LoadInventoryList() {
    var url = '/ProductionProcessing/GetAllInventory';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var templateWithData = Mustache.to_html($("#templateInventoryGroupModal").html(), { InventoryGroupSearch: res });
            $("#div-inventoryGroup").empty().html(templateWithData);
            MakePagination('inventoryGroupTableModal');
        },
        error: function (error, r) {
            console.log(error);
            console.log(r.responseText);
            ShowNotification("3", "Something Wrong!!");
        }
    });
}

var inventoryCount = 1;
function LoadForAdd(parameters) {
    $.ajax({
        url: '/ProductionProcessing/InventoryDetails',
        data: { 'id': parameters },
        success: function (data) {
            var inventoryCountCount = inventoryCount++;
            var Id = data.Id;
            var ProductId = data.ProductId;
            var WarehouseId = data.WarehouseId;
            var table = $('#inventoryGroupTableModal').DataTable();            

            var BaleQty = '';
            $('#inventoryGroupTableModal tr').each(function (i) {
                if ($(this).find('td').eq(0).text() == Id) {
                    BaleQty = $(this).find('td').eq(7).find('input').val();
                }
            });


            var BaleWeight = data.QtyInBale;
            var WeightInMon = data.QtyInBale;
            var SupplierId = data.SupplierId;

            var Product = data.Product;
            var Supplier = data.Supplier;
            var WareHouse = data.WareHouse;
            
            var object = {
                inventoryCountCount : inventoryCountCount,
                Id: Id, ProductId: ProductId, WarehouseId: WarehouseId,
                BaleQty: BaleQty, BaleWeight: BaleWeight,
                WeightInMon: WeightInMon, SupplierId: SupplierId, Product: Product,
                Supplier: Supplier, WareHouse: WareHouse
            };
            detailsStockOut.push(object);
            var templateWithData = Mustache.to_html($("#templateStockOutModal").html(), { StockTableAdd: detailsStockOut });
            $("#div-stockOut-add").empty().html(templateWithData);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}