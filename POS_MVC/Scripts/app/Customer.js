$(function () {
    LoadCustomerList();
});


$(document).ready(function () {
    LoadListData();
});

function LoadListData() {
    var url = "/Customer/GetAll";
    if ($.fn.dataTable.isDataTable('#dataList')) {
        var tables = $('#dataList').DataTable();
        tables.destroy();
    }
    $('#dataList').dataTable({
        "processing": true,
        "serverSide": true,
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

function LoadCustomerList() {
    var url = '/Customer/GetAll';

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

function LoadSingleData(parameters) {
    $.ajax({
        url: '/Customer/Details',
        data: { 'id': parameters },
        success: function (data) {
            $("#hdId").val(data.Id);
            $("#txtCustomerName").val(data.Name);
            $("#txtCPName").val(data.ContactPersonName);
            $("#txtAddress").val(data.Address);
            $("#txtPhone").val(data.Phone);
            $("#txtEmail").val(data.Email);
            $("#txtDescription").val(data.Description);
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}

function FormDataAsObject() {
	var object = new Object();
	object.Name = $('#txtCustomerName').val();
	object.Code = $('#txtCustomerCode').val();
	object.ContactPersonName = $('#txtCPName').val();
	object.Address = $('#txtAddress').val();
	object.Phone = $('#txtPhone').val();
	object.Email = $('#txtEmail').val();
	object.Description = $('#txtDescription').val();
	
	return object;
}

function FormDataAsObjectForLedger() {
    var object = new Object();
    object.AccountGroupId = 10;
    object.LedgerName = $('#txtCustomerName').val() + $('#txtCustomerCode').val();
    object.OpeningBalance = $('#txtOpeningBalance').val();
    object.CrOrDr = 'Dr';
    object.Narration = $('#txtNarration').val();
    object.MailingName = $('#txtCustomerName').val();
    object.Address = $('#txtAddress').val();
    object.Phone = $('#txtPhone').val();
    object.Mobile = $('#txtPhone').val();
    object.Email = $('#txtEmail').val();
    object.BillByBill = $("#ddlBillByBill option:selected").val();
    object.IsDefault = 0;
    return object;
}

function ResetForm() {
    $('#txtCustomerName').val('');
    $('#txtCPName').val('');
    $('#txtAddress').val('');
    $('#txtPhone').val('');
    $('#txtEmail').val('');
    $('#txtDescription').val('');
    $("#btnSave").show();
}

function Save() {

    if ($("#txtCustomerName").val() == "") {
        alert('Please give customer name.');
        return false;
    }
    var formObject = FormDataAsObject();
    var formObjectLedger = FormDataAsObjectForLedger();

	$.ajax({
		url: '/Customer/Create',
		method: 'post',
		dataType: 'json',
		async: false,
		data: {
		    Name: formObject.Name,
            Code: formObject.Code,
			ContactPersonName: formObject.ContactPersonName,
			Address: formObject.Address,
			Phone: formObject.Phone,
			Email: formObject.Email,
			Description: formObject.Description,
			create: 1,
			AccountGroupId: formObjectLedger.AccountGroupId,
			LedgerName: formObjectLedger.LedgerName,
			OpeningBalance: formObjectLedger.OpeningBalance,
			IsDefault: formObjectLedger.IsDefault,
			CrOrDr: formObjectLedger.CrOrDr,
			Narration: formObjectLedger.Narration,
			MailingName: formObjectLedger.MailingName,
			BillByBill: formObjectLedger.BillByBill
		},
		success: function (data) {
		    ShowNotification("1", "Customer Saved!!");
		    ResetForm();
		    LoadCustomerList();
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
        url: '/Customer/Edit',
        data: {
            Id: $("#hdId").val(),
            Name: formObject.Name,
            ContactPersonName: formObject.ContactPersonName,
            Address: formObject.Address,
            Phone: formObject.Phone,
            Email: formObject.Email,
            Description: formObject.Description,
            create: 1
        },
        async: false,
        success: function (data) {
            if (data.result == false) {
                $("#lblMessage").html(data.Error);
            }
            //alert('Update Successfully.');
            ShowNotification("1", "Customer Updated!!");
            $("#btnSave").show();
            LoadCustomerList();
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
        url: '/Customer/Delete',
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
            ShowNotification("1", "Customer Deleted!!");
            $("#btnSave").show();
            LoadCustomerList();
            ResetForm();
        },
        error: function () {
            alert('An error occured try again later');
        }
    });
});