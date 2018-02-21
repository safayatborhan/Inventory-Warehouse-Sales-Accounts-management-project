
$(document).ready(function () {
    LoadEmployeeList();
});


function LoadEmployeeList() {
    var url = '/Employee/GetAll';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            var templateWithData = Mustache.to_html($("#templateEmployeeGroupModal").html(), { EmployeeGroupSearch: res });
            $("#div-employeeGroup").empty().html(templateWithData);
            MakePagination('employeeGroupTableModal');
        },
        error: function (error, r) {
            ShowNotification("3", "Something Wrong!!");
        }
    });
}

function LoadForEdit(parameters) {
    $("#btnSave").hide();
    $("#btnUpdate").show();
    $("#btnDelete").show();

    LoadSingleData(parameters);
}

function LoadSingleData(parameters) {
    $.ajax({
        url: '/Employee/Details',
        data: { 'id': parameters },
        success: function (data) {
            $("#hdId").val(data.Id);
            $("#txtCode").val(data.Code);
            $("#txtFirstName").val(data.FirstName);
            $("#txtLastName").val(data.LastName);
            $("#txtFatherName").val(data.FatherName);
            $("#txtMotherName").val(data.MotherName);
            $("#txtAddress").val(data.Address);
            $("#txtCity").val(data.City);
            $("#txtPhone").val(data.Phone);
            $("#txtEmail").val(data.Email);
            $("#txtZipCode").val(data.ZipCode);
            $("#txtRemarks").val(data.Remarks);

        },
        error: function () {
            alert('An error occured try again later');
        }
    });
}



function Save() {
    if ($("#txtCode").val() == "") {
        alert('Emloyee Code can not be empty.');
        return false;
    }
    var object = new Object();
    
    object.Code = $('#txtCode').val();
    object.FirstName = $('#txtFirstName').val();
    object.LastName = $('#txtLastName').val();
    object.FatherName = $('#txtFatherName').val();
    object.MotherName = $('#txtMotherName').val();
    object.Address = $('#txtAddress').val();
    object.City = $('#txtCity').val();
    object.Phone = $('#txtPhone').val();
    object.Email = $('#txtEmail').val();
    object.ZipCode = $('#txtZipCode').val();
    object.Remarks = $('#txtRemarks').val();


    $.ajax({
        url: '/Employee/Create',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            employee: object
        },
        success: function (data) {
            ShowNotification("1", "Employee Saved!!");
            ResetForm();
            LoadEmployeeList();
        },
        error: function () {
            ShowNotification("3", "Something Wrong!!");
        }
    });
    
}

$("#btnUpdate").click(function () {
    if ($("#txtCode").val() == "") {
        alert('Emloyee Code can not be empty.');
        return false;
    }
    var object = new Object();
    object.Id = $('#hdId').val();
    object.Code = $('#txtCode').val();
    object.FirstName = $('#txtFirstName').val();
    object.LastName = $('#txtLastName').val();
    object.FatherName = $('#txtFatherName').val();
    object.MotherName = $('#txtMotherName').val();
    object.Address = $('#txtAddress').val();
    object.City = $('#txtCity').val();
    object.Phone = $('#txtPhone').val();
    object.Email = $('#txtEmail').val();
    object.ZipCode = $('#txtZipCode').val();
    object.Remarks = $('#txtRemarks').val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Employee/Edit',        
        data: {
            model: object,
            create: 1
        },
        async: false,
        success: function (data) {
            ShowNotification("1", "Employee Updated!!");
            LoadEmployeeList();
            $("#btnSave").show();
            $("#btnDelete").show();
            $("#btnUpdate").show();

            ResetForm();
            
        },
        error: function () {
            ShowNotification("3", "Something Wrong!!");
        }
    });
});

$("#btnDelete").click(function (e) {
    $.ajax({
        type: 'POST',
        url: '/Employee/Delete',
        dataType: 'json',
        data: {
            Id: $("#hdId").val(),
            create: 1
        },
        async: false,
        success: function (data) {
            ShowNotification("1", "Employee Deleted!!");
            LoadEmployeeList();
            $("#btnSave").show();
            $("#btnDelete").show();
            $("#btnUpdate").show();

            ResetForm();
        },
        error: function () {
            ShowNotification("3", "Something Wrong!!");
        }
    });
});

function ResetForm() {
    $('#txtCode').val("");
    $('#txtFirstName').val("");
    $('#txtLastName').val("");
    $('#txtFatherName').val("");
    $('#txtMotherName').val("");
    $('#txtAddress').val("");
    $('#txtCity').val("");
    $('#txtPhone').val("");
    $('#txtEmail').val("");
    $('#txtZipCode').val("");
    $('#photoEmployeePhoto').val("");
    $('#txtRemarks').val("");
}

function FormDataAsObject() {
    var object = new Object();
    object.Code = $('#txtCode').val();
    object.FirstName = $('#txtFirstName').val();
    object.LastName = $('#txtLastName').val();
    object.FatherName = $('#txtFatherName').val();
    object.MotherName = $('#txtMotherName').val();
    object.Address = $('#txtAddress').val();
    object.City = $('#txtCity').val();
    object.Phone = $('#txtPhone').val();
    object.Email = $('#txtEmail').val();
    object.ZipCode = $('#txtZipCode').val();
    return object;
}


function UploadImage() {
    var file = $('#photoEmployeePhoto').get(0).files;
    var data = new FormData;
    data.append("ImageFile", file[0]);
    $.ajax({
        url: '/Employee/ImageUpload',
        method: 'post',
        data: data,
        contentType : false,
        processData : false,
        success: function (imgId) {

        },
        error: function () {
            ShowNotification("3", "Something Wrong!!");
        }
    });
}