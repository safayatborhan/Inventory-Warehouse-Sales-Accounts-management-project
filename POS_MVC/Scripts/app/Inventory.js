
$(document).ready(function () {
    LoadAllProduct();
    LoadAllSize();
    LoadAllDesign();
    LoadAllColor();
    LoadListData();
    LoadAllCategory();
});

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
                $("#" + controlId).get(0).options[0] = new Option("All", "All");
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
                $("#" + controlId).get(0).options[0] = new Option("All", "All");
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
                $("#" + controlId).get(0).options[0] = new Option("All", "All");
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
                $("#" + controlId).get(0).options[0] = new Option("All", "All");
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
                $("#" + controlId).get(0).options[0] = new Option("All", "All");
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

function Save() {

    var ProductID = $("#ddlProduct").val();
    var CategoryID = $("#ddlCategory").val();

    var SizeID = $("#ddlSize").val();
    var DesignID = $("#ddlDesign").val();

    var ColorID = $("#ddlColor").val();

    var param = "ReportName=HeadOfficeInventoryReport&ProductID=" + ProductID + "&CategoryID=" + CategoryID + "&SizeID=" + SizeID + "&DesignID=" + DesignID + "&ColorID=" + ColorID;
    window.open("../Report/Viewer/ReportViewer.aspx?" + param, "_blank");

}

