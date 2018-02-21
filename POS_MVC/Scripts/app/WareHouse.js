

function ClearAddBox() {
    $("#ColorId").val('0');
    $("#txtColor").val('');
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


// using parital list view object for populate
$(document).ready(function () {
    LoadWareHouseList();
});


function LoadWareHouseList() {
    var url = '/WareHouse/GetAll';

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
function ResetForm() {
    $('#txtWareHouseName').val("");
    $("#btnSave").show();
    $("#btnDelete").show();
    $("#btnUpdate").show();
}


function LoadSingleData(parameters) {
    $.ajax({
        url: "/WareHouse/Details",
        data: { 'id': parameters },
        success: function (data) {
            $("#hdId").val(data.Id);
            $("#txtWareHouseName").val(data.WareHouseName);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}


function FormDataAsObject() {
    var object = new Object();
    object.WareHouseName = $('#txtWareHouseName').val();
    //object.GroupName = $('#txtGroupName').val();
    //object.Manufacturer = $('#txtColorDes').val();
    return object;
}

function Save() {
    //debugger;
    if ($("#txtWareHouseName").val() == "") {
        alert('WareHouse Name Empty');
        return false;
    }

    var formObject = FormDataAsObject();

    $.ajax({
        url: '/WareHouse/Create',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            Id: formObject.Id,
            WareHouseName: formObject.WareHouseName,
            create: 1
        },
        success: function (data) {
            ShowNotification("1", "Warehouse Saved!!");
            LoadWareHouseList();
            $('#txtWareHouseName').val("");
        },
        error: function () {

        }
    });

}


$("#btnUpdate").click(function (e) {
    var formObject = FormDataAsObject();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/WareHouse/Edit',
        data: {
            Id: $("#hdId").val(),
            WareHouseName: formObject.WareHouseName,
            create: 1
        },
        async: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            //alert('Update Successfully.');
            ShowNotification("1", "Warehouse Updated!!");
            LoadWareHouseList();
            $("#btnSave").show();
            $("#btnDelete").show();
            $("#btnUpdate").show();
            $('#txtWareHouseName').val("");
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});
$("#btnDelete").click(function (e) {
    $.ajax({
        type: 'POST',
        url: '/WareHouse/Delete',
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
            ShowNotification("1", "Warehouse Deleted!!");
            LoadWareHouseList();
            $("#btnSave").show();
            $("#btnDelete").show();
            $("#btnUpdate").show();
            $('#txtWareHouseName').val("");
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});

