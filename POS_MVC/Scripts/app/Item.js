
$(function () {
    $("#btnSave").show();
    $("#btnDelete").hide();
    $("#btnUpdate").hide();
    $("#txtPBarCode").val('');
    $("#txtSBarCode").val('');
  //  LoadAllProduct();
   // LoadAllCategory();
    ClearAddBox();
});

$(document).ready(function () {
    LoadItemList();
    LoadAllProduct();
    LoadAllSize();
    LoadAllDesign();
    LoadAllColor();
    LoadListData();
    LoadAllCategory();
});

function LoadItemList() {
    var url = '/Item/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            console.log(res);
            var templateWithData = Mustache.to_html($("#templateProductGroupModal").html(), { ProductGroupSearch: res });
            $("#div-productGroup").empty().html(templateWithData);
            MakePagination('productGroupTableModal');
        },
        error: function () {
        }
    });
}

function LoadAllProduct() {
    var url = '/Product/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var controlId = "ddlProduct";
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("---- Select -----", "");
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

function LoadAllSize() {
    var url = '/Size/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var controlId = "ddlSize";
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("---- Select -----", "");
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.Name, item.Id);
                });
            }
        },
        error: function () {
        }
    });
}

function LoadAllColor() {
    var url = '/Color/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var controlId = "ddlColor";
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("---- Select -----", "");
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.Name, item.Id);
                });
            }
        },
        error: function () {
        }
    });
}

function LoadAllDesign() {
    var url = '/Design/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var controlId = "ddlDesign";
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("---- Select -----", "");
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.DesignName, item.Id);
                });
            }
        },
        error: function () {
        }
    });
}

function InsertFail(response) {
    var content = "Please try again later";
    $("#lblMessage").html(content);
};

function ClearAddBox() {
    $("#DesignID").val('0');
    $("#ProductID").val('0');
    $("#CategoryID").val('0');
    $("#BrandID").val('0');
    $("#SizeID").val('0');
    $("#ColorID").val('0');
    $("#txtPBarCode").val('');
    $("#txtSBarCode").val('');
    $("#txtBarcode1").val('');
    $("#txtBarcode2").val('');
    $("#txtCPU").val('');
    $("#txtWSP").val('');
    $("#txtRPU").val('');
    $("#txtDiscountPercent").val('');
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

function LoadForEdit(parameters) {
    ClearAddBox();
    //e.preventDefault();
    $("#modalpopupAdd").dialog({ width: 650, minHeight: 300, modal: true });
    $("#ui-id-1").html("Modify Category");
    $("#btnSave").hide();
    $("#btnUpdate").show();
    $("#btnDelete").hide();

    LoadSingleData(parameters);
}

function LoadForDelete(parameters) {
    ClearAddBox();
    //e.preventDefault();
    $("#modalpopupAdd").dialog({ width: 650, minHeight: 300, modal: true });
    $("#ui-id-1").html("Delete Category");
    $("#btnSave").hide();
    $("#btnUpdate").hide();
    $("#btnDelete").show();

    LoadSingleData(parameters);
}

$("#CategoryID").change(function () {
    //alert("good");
    //debugger;
    if ($("#CategoryID").val() != "") {

        $.ajax({
            url: '/Setup/GetPBarcode',
            success: function (data) {
                $("#txtSBarCode").val(data.data.SBarCode);
                $("#txtPBarCode").val(data.data.PBarCode);
            },
            error: function () {
                alert('An error occured try again later');
            }
        });


    } else {
        //LoadNotTranferdDataByDCNO("");
        //$('#btnSave').hide();
        //$('#btnReport').hide();
    }
});

function LoadSingleData(parameters) {
    $.ajax({
        url: url + 'Setup/FindByCategory',
        data: { 'btID': parameters },
        success: function (data) {
            $("#BrandID").val(data.data.BrandID);
            $("#txtBrandName").val(data.data.BrandName);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}

function FormDataAsObject() {
    var object = new Object();
    object.ProductID = $('#ddlProduct').val();
   // object.BrandID = $('#ddlCategory').val();
    object.SizeID = $('#ddlSize').val();
    object.DesignID = $('#ddlDesign').val();
    object.ColorID = $('#ddlColor').val();
    object.Barcode1 = $('#txtBarcode1').val();
    object.Barcode2 = $('#txtBarcode2').val();
    object.CostPrice = $('#txtCostPrice').val();
    object.RetailPrice = $('#txtRetailPrice').val();
    object.WholeSalesPrice = $('#txtWSPrice').val();
    
    return object;
}

function ItemSave() {
    debugger;
   
    var formObject = FormDataAsObject();
    console.log("call");

    $.ajax({
        url: '/Item/Create',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            ProductID : $('#ddlProduct').val(),
           // CategoryId : $('#ddlCategory').val(),
            SizeID : $('#ddlSize').val(),
            DesignID : $('#ddlDesign').val(),
            ColorID : $('#ddlColor').val(),
            Barcode1 : $('#txtBarcode1').val(),
            Barcode2 : $('#txtBarcode2').val(),
            CostPrice : $('#txtCostPrice').val(),
            RetailPrice : $('#txtRetailPrice').val(),
            WholeSalesPrice : $('#txtWSPrice').val()
        },
        success: function (data) {
            ShowNotification("1", "Item Saved!!")
            ResetForm();
            LoadItemList();
        },
        error: function () {


        }
    });

}

$("#btnUpdate").click(function (e) {
    e.preventDefault();

    if ($("#txtBrandName").val() == "") {
        alert('BrandName Is Empty.');
        return false;
    }

    var ratemaster = {
        "BrandID": $("#BrandID").val(),
        "BrandName": $("#txtBrandName").val(),
    };

    JsonData = JSON.stringify(ratemaster);
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/Setup/UpdateBrand',
        data: JsonData,
        async: false,
        cache: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            alert('Update Successfully.');
            LoadListData();
            ClearAddBox();
            $("#btnSave").show();
            $("#btnDelete").hide();
            $("#btnUpdate").hide();
            //LoadListData();
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});

$("#btnDelete").click(function (e) {
    e.preventDefault();
    var ratemaster = {
        "BrandID": $("#BrandID").val(),
    };

    JsonData = JSON.stringify(ratemaster);
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/Setup/DeleteBrand',
        data: JsonData,
        async: false,
        cache: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            alert('Delete Successfully.');
            LoadListData();
            ClearAddBox();
            $("#btnSave").show();
            $("#btnDelete").hide();
            $("#btnUpdate").hide();
            //LoadListData();
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});

function LoadAllCategory() {
    var url = '/Category/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var controlId = "ddlCategory";
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("---- Select -----", "");
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.CategoryName, item.Id);
                });
            }
        },
        error: function () {
        }
    });
}

