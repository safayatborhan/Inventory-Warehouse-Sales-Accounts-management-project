
var detailsSales = [];
var detailsSalesForPost = [];

var detailSalesForPost = [];

var detailSalesInMaster = [];

var orderElements = [];
var orderDeliveryQty = [];

$(document).ready(function () {
    LoadInvoiceNo("txtPoNo");
    LoadInventoryList();
    LoadCustomerCombo("ddlCustomer");  
    
});

function GetCustomerId() {
    var customerDropdown = document.getElementById("ddlCustomer");
    var customerId = customerDropdown.options[customerDropdown.selectedIndex].value;
    LoadSalesOrderList(customerId);
}

function LoadInvoiceNo(controlId) {
    var url = "/Sales/GetInvoiceNumber";
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


function LoadInventoryList() {
    var url = '/Sales/GetAllInventory';
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

function LoadSalesOrderList(parameters) {
    var url = '/Sales/GetAllSaleOrdersFilterdByCustomer';
    $.ajax({
        url: url,
        method: 'POST',
        data: { 'CustomerID': parameters },
        success: function (res) {
            var templateWithData = Mustache.to_html($("#templateSalesOrderGroupModal").html(), { SalesOrderGroupSearch: res });
            $("#div-salesOrderGroup").empty().html(templateWithData);

            MakePagination('salesOrderGroupTableModal');
        },
        error: function (error, r) {
            ShowNotification("3", "Something Wrong!!");
        }
    });
}


var count = 1;
function LoadForAdd(InvId) {
    //$.ajax({
    //    url: '/Product/Details',
    //    data: { 'id': parameters },
    //    success: function (data) {

    //    },
    //    error: function () {
    //        alert('An error occured try again later');
    //    }
    //});

    var countCount = count++;
    var Id = "0";
    var ProductName = "";

    var BaleQty = '';
    var BaleWeight = '';
    var Rate = '';

    $('#inventoryGroupTableModal tr').each(function (i) {
        if ($(this).find('td').eq(0).text() == InvId) {
            Id = $(this).find('td').eq(1).html();
            ProductName = $(this).find('td').eq(2).html();
            BaleQty = $(this).find('td').eq(5).find('input').val();
            BaleWeight = $(this).find('td').eq(6).find('input').val();
            Rate = $(this).find('td').eq(7).find('input').val();
        }
    });
    var TotalQtyInKG = BaleQty * BaleWeight;
    var Amount = Rate * BaleQty;
    var SalesOrderId = '';
    var object = {
        countCount: countCount,
        Id: Id,
        ProductName: ProductName,
        BaleQty: BaleQty,
        BaleWeight: BaleWeight,
        TotalQtyInKG: TotalQtyInKG, Rate: Rate,
        Amount: Amount,
        SalesOrderId: SalesOrderId
    };
    detailsSales.push(object);
    console.log(detailsSales);
    var templateWithData = Mustache.to_html($("#templateSalesGroupModalGrid").html(), { SalesGroupSearchGrid: detailsSales });
    $("#div-sales-add").empty().html(templateWithData);
}

function LoadForAddOrder(parameters) {
    $.ajax({
        url: '/Sales/Details',
        data: { 'id': parameters },
        success: function (data) {
            var countCount = count++;
            var Id = '';
            var ProductName = '';

            var BaleQty = '';
            var BaleWeight = '';
            var Rate = '';
            var SalesOrderId = '';

            $('#salesOrderGroupTableModal tr').each(function (i) {
                if ($(this).find('td').eq(0).text() == data.Id) {
                    Id = $(this).find('td').eq(1).text();
                    ProductName = $(this).find('td').eq(2).text();
                    BaleQty = $(this).find('td').eq(6).find('input').val();
                    BaleWeight = $(this).find('td').eq(4).text();
                    Rate = $(this).find('td').eq(5).find('input').val();
                    SalesOrderId = $(this).find('td').eq(0).text();
                }
            });


            var TotalQtyInKG = BaleQty * BaleWeight;

            var Amount = Rate * BaleQty;
            var object = {
                countCount: countCount,
                Id: Id, ProductName: ProductName,
                BaleQty: BaleQty, BaleWeight: BaleWeight,
                TotalQtyInKG: TotalQtyInKG, Rate: Rate,
                Amount: Amount,
                SalesOrderId: SalesOrderId
            };

            var object2 = {
                BaleQty: BaleQty
            };
            
            orderDeliveryQty.push(BaleQty);

            data.CreatedDate = ToJavaScriptDate(data.CreatedDate);
            data.DeliveryDate = ToJavaScriptDate(data.DeliveryDate);
            data.OrderDate = ToJavaScriptDate(data.OrderDate);
            data.PricingDate = ToJavaScriptDate(data.PricingDate);



            orderElements.push(data);
            console.log(orderElements);
            detailsSales.push(object);
            var templateWithData = Mustache.to_html($("#templateSalesGroupModalGrid").html(), { SalesGroupSearchGrid: detailsSales });
            $("#div-sales-add").empty().html(templateWithData);
            console.log(orderDeliveryQty);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}

function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}

function Save() {
    GetDataFromDatatable();
    var url = '/Sales/SaveSales';
    $.ajax({
        url: url,
        method: 'POST',
        data: {
            salesMasters: detailsSalesForPost,
            salesDetail: detailSalesInMaster,
            salesOrders: orderElements,
            lstDeliveryQunatities: orderDeliveryQty
        },
        success: function (data) {
            ShowNotification("1", "Sales Saved!!");

            detailsSales = [];
            var templateWithData = Mustache.to_html($("#templateSalesGroupModalGrid").html(), { SalesGroupSearchGrid: detailsSales });
            $("#div-sales-add").empty().html(templateWithData);
        },
        error: function () {
        }
    });

}


function GetDataFromDatatable() {
    $('#salesGroupTableModalGrid tr').each(function (i) {
        if (i > 0) {
            var SalesInvoice = $("#txtPoNo").val();
            var CustomerID = $("#ddlCustomer option:selected").val();
            var TotalAmount = $(this).find('td').eq(7).text();
            var Notes = $("#txtDescriptions").val();

            var ProductId = $(this).find('td').eq(1).text();
            var BaleQty = $(this).find('td').eq(3).text();
            var BaleWeight = $(this).find('td').eq(4).text();
            var TotalQtyInKG = $(this).find('td').eq(5).text();
            var Rate = $(this).find('td').eq(6).text();
            var Amount = $(this).find('td').eq(7).text();
            var SalesOrderId = $(this).find('td').eq(8).text();

           
            var object = {
                SalesInvoice: SalesInvoice,
                CustomerID: CustomerID,
                TotalAmount: TotalAmount,
                Notes: Notes,
                SalesOrderId: SalesOrderId
            };

            var object2 = {
                ProductId: ProductId,
                BaleQty: BaleQty,
                BaleWeight: BaleWeight,
                TotalQtyInKG: TotalQtyInKG,
                Rate: Rate,
                Amount: Amount
            };

            detailSalesInMaster.push(object2);

            detailsSalesForPost.push(object);

        }
    });
}


function OnDeleteSalesOrder(Id) {
    for (var i = 0; i < detailsSales.length; i++) {
        if (detailsSales[i].countCount == Id) {
            detailsSales.splice(i, 1);
        }
    }
    var templateWithData = Mustache.to_html($("#templateSalesGroupModalGrid").html(), { SalesGroupSearchGrid: detailsSales });
    $("#div-sales-add").empty().html(templateWithData);
}