
$(function () {
    LoadSupplierList();
    $("#btnAddNew").click(function () {
        ClearAddBox();

        $("#ID").val("0");

        $("#ui-id-1").html("Create Category");
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

function InsertFail(response) {
    var content = "Please try again later";
    $("#lblMessage").html(content);
};

function ClearAddBox() {
    $("#CategoryID").val('0');
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

$(document).ready(function () {
    LoadListData();
});

function LoadListData() {
    var url = "/Suppliers/GetAll";
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
            { "data": "SupplierID" },
            { "data": "SupplierName" },
            { "data": "Mobile" },
            { "data": "Email" },

            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                    return '<button type="button" onclick="LoadForEdit(\'' + data.BrandID + '\');" class="btn btn-xs btn-info"><i class="fa fa-edit"></i></button>' +
                        '&nbsp;&nbsp; <button type="button" onclick="LoadForDelete(\'' + data.BrandID + '\');" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button>';
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

function LoadSupplierList() {
    var url = '/Suppliers/GetAll';

    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var templateWithData = Mustache.to_html($("#templateProductGroupModal").html(), { ProductGroupSearch: res });
            $("#div-productGroup").empty().html(templateWithData);
            MakePagination('productGroupTableModal');
        },
        error: function () {
        }
    });
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
        url: '/Suppliers/Details',
        data: { 'id': parameters },
        success: function (data) {
            $("#hdId").val(data.Id);
            $("#txtSupplierName").val(data.Name);
            $("#txtMobileNo").val(data.ContactPersonPhone);
            $("#txtContactName").val(data.ContactPersonName);
            $("#txtAddress").val(data.Address);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}

function FormDataAsObject() {
    var object = new Object();
    object.Name = $('#txtSupplierName').val();
    object.ContactPersonPhone = $('#txtMobileNo').val();
    object.ContactPersonName = $('#txtContactName').val();
    object.Address = $('#txtAddress').val();
    return object;
}

function ResetForm() {
    $('#txtSupplierName').val('');
    $('#txtMobileNo').val('');
    $('#txtAddress').val('');
    $('#txtContactName').val('');
    $("#btnSave").show();
}


function Save() {
    //debugger;
    if ($("#txtSupplierName").val() == "") {
        alert('Supplier Name Empty');
        return false;
    }

    var formObject = FormDataAsObject();

    $.ajax({
        url: '/Suppliers/Create',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            Name: formObject.Name,
            ContactPersonPhone: formObject.ContactPersonPhone,
            ContactPersonName: formObject.ContactPersonName,
            Address : formObject.Address,
            create: 1
        },
        success: function (data) {
            ShowNotification("1", "Supplier Saved!!");
            ResetForm();
            LoadSupplierList();
        },
        error: function () {

        }
    });

}

$("#btnUpdate").click(function () {
    var formObject = FormDataAsObject();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Suppliers/Edit',
        data: {
            Id: $("#hdId").val(),
            Name: formObject.Name,
            ContactPersonPhone: formObject.ContactPersonPhone,
            ContactPersonName: formObject.ContactPersonName,
            Address: formObject.Address,
            create: 1
        },
        async: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            //alert('Update Successfully.');
            ShowNotification("1", "Supplier Updated!!");
            $("#btnSave").show();
            LoadSupplierList();
            ResetForm();

        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});

$("#btnDelete").click(function () {
    $.ajax({
        type: 'POST',
        url: '/Suppliers/Delete',
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
            ShowNotification("1", "Supplier Deleted!!");
            $("#btnSave").show();
            LoadSupplierList();
            ResetForm();
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});

