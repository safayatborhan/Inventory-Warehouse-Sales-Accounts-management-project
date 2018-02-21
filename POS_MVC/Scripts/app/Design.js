
$(function () {
    $("#btnSave").show();
    $("#btnDelete").hide();
    $("#btnUpdate").hide();
});

function InsertFail(response) {
    var content = "Please try again later";
    $("#lblMessage").html(content);
};

function ClearAddBox() {
    $("#Id").val('0');
    $("#txtDesignName").val('');
    $("#txtDesignCode").val('');
    $("#txtDesignDes").val('');
}

$(document).ready(function () {
    LoadDesignList();
});

function LoadDesignList() {
    var url = '/Design/GetAll';

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

function FormDataAsObject() {
    var object = new Object();
    object.DesignName = $('#txtDesignName').val();
    object.DesignCode = $('#txtDesignCode').val();
    object.Manufacturer = $('#txtDesignDes').val();
    return object;
}

function Save() {
    //debugger;
    if ($("#txtDesignName").val() == "") {
        alert('DesignName Is Empty.');
        return false;
    }

    if ($("#txtDesignCode").val() == "") {
        alert('Design Code Is Empty.');
        return false;
    }

    var formObject = FormDataAsObject();

    $.ajax({
        url: '/Design/Create',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            Id: formObject.Id,
            DesignName: formObject.DesignName,
            DesignCode: formObject.DesignCode,
            Descriptions: formObject.Descriptions,
            create: 1
        },
        success: function (data) {
            ShowNotification("1", "Design Saved!!")
            ClearAddBox();
            LoadDesignList();
        },
        error: function () {

        }
    });

}


$("#btnUpdate").click(function (e) {
    e.preventDefault();

    if ($("#txtDesignName").val() == "") {
        alert('DesignName Is Empty.');
        return false;
    }

    if ($("#txtDesignCode").val() == "") {
        alert('Design Code Is Empty.');
        return false;
    }

    var ratemaster = {
        "Id":$("#Id").val(),
        "DesignName": $("#txtDesignName").val(),
        "DesignCode": $("#txtDesignCode").val(),
        "Descriptions": $("#txtDescriptions").val()
    };

    JsonData = JSON.stringify(ratemaster);
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/Setup/UpdateDesign',
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
        "Id": $("#Id").val(),
    };

    JsonData = JSON.stringify(ratemaster);
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '/Setup/DeleteDesign',
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

