
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
    LoadCategoryGridList();
});
function LoadCategoryGridList() {
    var url = '/Category/GetAll';
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
    //e.preventDefault();
    $("#ui-id-1").html("Modify Category");
    $("#btnSave").hide();
    $("#btnUpdate").show();
    LoadSingleData(parameters);
}

function LoadForDelete(parameters) {
    ClearAddBox();
    //e.preventDefault();
    $("#ui-id-1").html("Delete Category");
    $("#btnSave").hide();
    $("#btnUpdate").hide();
    $("#btnDelete").show();

    LoadSingleData(parameters);
}
function ResetForm() {
    $('#txtCode').val("");
    $('#txtCategoryName').val("");
    $('#txtDescriptions').val("");
    $("#btnSave").show();
}

function LoadSingleData(parameters) {
    $.ajax({
        url: "/Category/Details",
        data: { 'id': parameters },
        success: function (data) {
            $("#hdId").val(data.Id);
            $("#txtCode").val(data.Code);
            $("#txtCategoryName").val(data.CategoryName);
            $("#txtDescriptions").val(data.Descriptions);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}

function FormDataAsObject() {
    var object = new Object();
    object.Code = $('#txtCode').val();
    object.CategoryName = $('#txtCategoryName').val();
    object.Descriptions = $('#txtDescriptions').val();
    return object;
}

function Save() {
    //debugger;
    if ($("#txtCode").val() == "") {
        alert('Code Name Empty');
        return false;
    }

    if ($("#txtCategoryName").val() == "") {
        alert(' Name Empty');
        return false;
    }

    var formObject = FormDataAsObject();

    $.ajax({
        url: '/Category/Create',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            Id: formObject.Id,
            Code: formObject.Code,
            CategoryName: formObject.CategoryName,
            Descriptions: formObject.Descriptions,
            create: 1
        },
        success: function (data) {
            console.log(data);
            ShowNotification("1","Category Saved!!")
            ResetForm();
            LoadCategoryGridList();
        },
        error: function () {

            ShowNotification("3", "Something Wrong!!")
        }
    });

}
$("#btnUpdate").click(function (e) {

    var formObject = FormDataAsObject();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Category/Edit',
        data: {
            //Id: $("#hdId").val(),
            //Code: $('#txtCode').val(),
            //CategoryName: $('#txtCategoryName').val(),
            //Descriptions: $('#txtDescriptions').val(),
            Id: $("#hdId").val(),
            Code: formObject.Code,
            CategoryName: formObject.CategoryName,
            Descriptions: formObject.Descriptions,
            create: 1
        },
        async: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            //alert('Update Successfully.');
            ShowNotification("1", "Category Updated!!");
            LoadCategoryGridList();
            $("#btnSave").show();
            $("#btnDelete").show();
            $("#btnUpdate").show();
            $('#txtCode').val("");
            $('#txtCategoryName').val("");
            $('#txtDescriptions').val("");
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});
$("#btnDelete").click(function (e) {
    $.ajax({
        type: 'POST',
        url: '/Category/Delete',
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
            ShowNotification("1", "Category Deleted!!");
            LoadCategoryGridList();
            $("#btnSave").show();
            $("#btnDelete").show();
            $("#btnUpdate").show();
            $('#txtCode').val("");
            $('#txtCategoryName').val("");
            $('#txtDescriptions').val("");
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});