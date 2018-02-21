var details = [];
$(document).ready(function () {
    LoadItemList();
    LoadAllWareHouse("ddlWareHouse");
    LoadSupplierCombo("ddlSupplier");
    LoadAllBranch("ddlBranch");
    var templateWithData = Mustache.to_html($("#templateProductModalAdd").html(), { ProductSearchAdd: details });
    $("#div-product-add").empty().html(templateWithData);

});

function LoadItemList() {
    var url = '/Inventory/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            console.log(res);
            // templateProductModal will be script id
            // div-product will be div id where you want to show
            // productTableModal to pagination
            var templateWithData = Mustache.to_html($("#templateProductModal").html(), { ProductSearch: res });
            $("#div-product").empty().html(templateWithData);
            MakePagination('productTableModal');
        },
        error: function () {
        }
    });
}

function InsertSuccess(response) {
    // debugger;
    if (response.result == false) {
        $("#lblMessage").html(response.Error);
        $("#modalpopupMessage").dialog();
    } else {
        ClearAddBox();
        if (response.Error == 'Deleted') {
            LoadListData();
            $("#lblMessage").html('Data Deleted Successfully');
            $("#modalpopupMessage").dialog();
            $("#modalpopupAdd").dialog('close');
        }
        if (response.Error == 'Saved') {
            LoadListData();
            //$("#lblMessage").html('Data Saved Successfully');
            //$("#modalpopupMessage").dialog();
            $("#modalpopupAdd").dialog('close');
        }
        if (response.Error == 'Updated') {
            LoadListData();
            $("#lblMessage").html('Data Updated Successfully');
            $("#modalpopupMessage").dialog();
            $("#modalpopupAdd").dialog('close');
        }
    }
}

function LoadListData() {
    var url = "/Item/GetAll";
    console.log(url);
}

function OnSelectProduct(productId) {
    GetDataFromDataTable(productId);
    console.log(details);
}

function GetDataFromDataTable(productId) {
    $('#productTableModal tr').each(function (i) {
        if (i > 0) {
            var Id = $(this).find('td').eq(0).text();
            if (productId == Id) {
                var ItemInfo = $(this).find('td').eq(1).text();
                var Barcode1 = $(this).find('td').eq(2).text();
                var RetailPrice = $(this).find('td').eq(3).text();
                var WholeSalesPrice = $(this).find('td').eq(4).text();
                var Quantity = $(this).find('td').eq(6).find('input').val();
                console.log(Quantity);
                var obj = new Object();
                obj.Id = Id;
                obj.ItemInfo = ItemInfo;
                obj.Barcode1 = Barcode1;
                obj.RetailPrice = RetailPrice;
                obj.WholeSalesPrice = WholeSalesPrice;
                obj.Quantity = Quantity;
                details.push(obj);
                var templateWithData = Mustache.to_html($("#templateProductModalAdd").html(), { ProductSearchAdd: details });
                $("#div-product-add").empty().html(templateWithData);
                // MakePagination('productTableModalAdded');

            }

        }
    });

    return details;
}
function Save() {
   // debugger;
    var url = '/BranchRecieve/Save';
    $.ajax({
        url: url,
        method: 'POST',
        data: { Po: $("#txtPo").val(), ShopID: $("#ddlBranch").val(), descriptions: $("#txtDescriptions").val(), WareHouseId: $("#ddlWareHouse").val(), SupplierId: $("#ddlSupplier").val(), response: details },
        success: function (res) {
            ShowNotification("1", "Item Transfer Saved!!")
        },
        error: function () {
        }
    });

}





