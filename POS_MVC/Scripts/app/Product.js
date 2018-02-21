$(function () {
    LoadProductList();   
});


$(document).ready(function () {
    LoadAllCategory();
    LoadListData();
});



function LoadProductList() {
    var url = '/Product/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].ProductType == "1") {
                    res[i].ProductType = "Option 1";
                }
                if (res[i].ProductType == "2") {
                    res[i].ProductType = "Finish Goods";
                }
                if (res[i].ProductType == "3") {
                    res[i].ProductType = "Option 3";
                }
            }
            var templateWithData = Mustache.to_html($("#templateProductGroupModal").html(), { ProductGroupSearch: res });
            $("#div-productGroup").empty().html(templateWithData);
            MakePagination('productGroupTableModal');
        },
        error: function (error,r) {
            console.log(error);
            console.log(r.responseText);
            ShowNotification("3", "Something Wrong!!");
        }
    });
}


function InsertFail(response) {
    var content = "Please try again later";
    $("#lblMessage").html(content);
};

function ClearAddBox() {
    //$("#CategoryID").val('0');
    $("#txtCategory").val('');
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
    var url = "/Product/GetAll";
    console.log(url);
    //debugger;
    if ($.fn.dataTable.isDataTable('#dataList')) {
        var tables = $('#dataList').DataTable();
        tables.destroy();
    }
    //"@Url.Action("CategoryList", "Setup")"
    $('#dataList').dataTable({
        "processing": true,
        "serverSide": true,
        // "ajax": url + "Setup/BrandList",
        "ajax": {
            "url": url,
            "type": "POST"
        },
        "columns": [
            { "data": "ProductID" },
            { "data": "ProductName" },

            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                    return '<button type="button" onclick="LoadForEdit(\'' + data.CategoryID + '\');" class="btn btn-xs btn-info"><i class="fa fa-edit"></i></button>' +
                        '&nbsp;&nbsp; <button type="button" onclick="LoadForDelete(\'' + data.CategoryID + '\');" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button>';
                }
            }
        ]
    });
}

function LoadForEdit(parameters) {    
    $("#ui-id-1").html("Modify Category");
    $("#btnSave").hide();
    $("#btnUpdate").show();
    $("#btnDelete").show();

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

function LoadSingleData(parameters) {
    $.ajax({
        url: '/Product/Details',
        data: { 'id': parameters },
        success: function (data) {            
            $("#hdId").val(data.Id);
            $("#txtCode").val(data.Code);
            $("#txtProductName").val(data.ProductName);
            var ddlProductType = document.getElementById('ddlProductCategory');
            ddlProductType.selectedIndex = data.ProductType;

            var ddlCategoryName = document.getElementById('ddlCategory');
            //ddlCategoryName.selectedIndex = data.Category.CategoryName;
            setSelectedValue(ddlCategoryName, data.Category.CategoryName);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}

function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text == valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}



function FormDataAsObject() {
    var object = new Object();
    object.CategoryId = $('#ddlCategory').val();
    object.Code = $('#txtCode').val();
    object.ProductName = $('#txtProductName').val();
    object.ProductType = $("#ddlProductCategory option:selected").val();
    console.log(object);
    return object;
}

function Save() {
    //debugger;
    if ($("#txtProductName").val() == "") {
        alert('Product Name Is Empty.');
        return false;
    }

    if ($("#txtCode").val() == "") {
        alert('Product Code Is Empty.');
        return false;
    }

    var formObject = FormDataAsObject();

    $.ajax({
        url: '/Product/Create',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            CategoryId: formObject.CategoryId,
            Code: formObject.Code,
            ProductName: formObject.ProductName,
            ProductType: formObject.ProductType,
            create: 1
        },
        success: function (data) {
            ShowNotification("1", "Product Saved!!");
           // ResetForm();
            LoadProductList();

            $('#txtProductName').val("");
            $('#txtCode').val("");

            var ddlProductType = document.getElementById('ddlProductCategory');
            ddlProductType.selectedIndex = 0;

            var ddlCategory = document.getElementById('ddlCategory');
            ddlCategory.selectedIndex = 0;
        },
        error: function () {
            ShowNotification("3", "Something Wrong!!")
        }
    });

}


function ResetForm() {
    $('#txtProductName').val("");
    $('#txtCode').val("");

    var ddlProductType = document.getElementById('ddlProductCategory');
    ddlProductType.selectedIndex = 0;

    var ddlCategory = document.getElementById('ddlCategory');
    ddlCategory.selectedIndex = 0;
    $("#btnSave").show();
}

$("#btnUpdate").click(function () {
    var formObject = FormDataAsObject();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Product/Edit',        
            data: {
                Id: $("#hdId").val(),
                CategoryId: formObject.CategoryId,
                Code: formObject.Code,
                ProductName: formObject.ProductName,
                ProductType: formObject.ProductType,
                create: 1
            },
        async: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            //alert('Update Successfully.');
            ShowNotification("1", "Product Updated!!")
            LoadListData();
            LoadProductList();
            $("#btnSave").show();
            $("#btnDelete").show();
            $("#btnUpdate").show();
            $('#txtProductName').val("");
            $('#txtCode').val("");

            var ddlProductType = document.getElementById('ddlProductCategory');
            ddlProductType.selectedIndex = 0;

            var ddlCategory = document.getElementById('ddlCategory');
            ddlCategory.selectedIndex = 0;
            
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});


$("#btnDelete").click(function (e) {
    $.ajax({
        type: 'POST',
        url: '/Product/Delete',
        dataType: 'json',
        data: {
            Id: $("#hdId").val(),
            create: 1
        },
        async: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            //alert('Delete Successfully.');
            ShowNotification("1", "Product Deleted!!");
            LoadListData();
            LoadProductList();
            $("#btnSave").show();
            $("#btnDelete").show();
            $("#btnUpdate").show();
            $('#txtProductName').val("");
            $('#txtCode').val("");
            var ddlProductType = document.getElementById('ddlProductCategory');
            ddlProductType.selectedIndex = 0;

            var ddlCategory = document.getElementById('ddlCategory');
            ddlCategory.selectedIndex = 0;
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



