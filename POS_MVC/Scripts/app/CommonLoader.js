function LoadAllWareHouse(controlId) {
    var url = "/WareHouse/GetAll";
    $.ajax({
        url: url,
        method: "POST",
        success: function (res) {
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("-পছন্দ করুন-", "");
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.WareHouseName, item.Id);
                });
            }
            $("#" + controlId).chosen({ no_results_text: "Oops, nothing found!" });

        },
        error: function () {
        }
    });
}
function LoadSupplierCombo(controlId) {
    var url = '/Suppliers/GetAll';

    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("-পছন্দ করুন-", "");
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.Name, item.Id);
                });
            }
            $("#" + controlId).chosen({ no_results_text: "Oops, nothing found!" });
        },
        error: function () {
        }
    });
}
function LoadAllBranch(controlId) {
    var url = "/Branch/GetAll";
    $.ajax({
        url: url,
        method: "POST",
        success: function (res) {
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("-পছন্দ করুন-", "");
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
function LoadAllProduct(controlId) {
    var url = "/Product/GetAll";
    $.ajax({
        url: url,
        method: "POST",
        success: function (res) {
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("-পছন্দ করুন-", "-1");
            }
            if (data != null) {
                $.each(data, function (index, item) {
                    $("#" + controlId).get(0).options[$("#" + controlId).get(0).options.length] = new Option(item.ProductName, item.Id);
                });
            }
            $("#" + controlId).chosen({ no_results_text: "Oops, nothing found!" });
        },
        error: function (err) {
            console.log(err);
        }
    });
}


function LoadCustomerCombo(controlId) {
    var url = '/Customer/GetAll';

    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var data = res;
            //alert('Success');
            $("#" + controlId).empty();
            $("#" + controlId).get(0).options.length = 0;
            if (true) {
                $("#" + controlId).get(0).options[0] = new Option("-পছন্দ করুন-", "");
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