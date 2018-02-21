
$(function () {
    //$( "#tabs" ).tabs();
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
    var url = "/Setup/ShopList";
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
            { "data": "ShopID" },
            { "data": "ShopName" },

            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                    return '<button type="button" onclick="LoadForEdit(\'' + data.ShopID + '\');" class="btn btn-xs btn-info"><i class="fa fa-edit"></i></button>' +
                        '&nbsp;&nbsp; <button type="button" onclick="LoadForDelete(\'' + data.ShopID + '\');" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button>';
                }
            }
        ]
    });
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

function LoadSingleData(parameters) {
    $.ajax({
        url: url + 'Setup/FindByCategory',
        data: { 'btID': parameters },
        success: function (data) {
            $("#CategoryID").val(data.data.CategoryID);
            $("#RateID").val(data.data.RateID);
            $("#CategoryName").val(data.data.CategoryName);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}

$("#btnSave").click(function (e) {
    e.preventDefault();

    if ($("#txtShopName").val() == "") {
        alert('ShopName Is Empty.');
        return false;
    }

    var ratemaster = {
        "ShopName": $("#txtShopName").val(),
        "ShopAddress": $("#txtAddressName").val(),
    };

    JsonData = JSON.stringify(ratemaster);
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/Setup/CreateShop',
        data: JsonData,
        async: false,
        cache: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            alert('Save Successfully.');
            LoadListData();
            //ClearAddBox();

            //LoadListData();
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});

$("#btnUpdate").click(function () {
    var form = $("#formAdd");

    //if ($("#RateID").val() == "") {
    if ($("select[name='RateID'] option:selected").index() == 0) {
        alert('Please Select Rate Class Name');
        return false;
    }

    if ($("#CategoryName").val() == "") {
        alert('Category Name Empty');
        return false;
    }
    form.attr("action", url + "Setup/UpdateCategory");
});

$("#btnDelete").click(function () {
    var form = $("#formAdd");
    form.attr("action", url + "Setup/DeleteCategory");
});

