
$(document).ready(function () {
    LoadSizeGrid();

});

function GenerateProductGroupId() {
    $.ajax({
        url: '@Url.Action("GenerateProductGroupId", "ProductGroup")',
        type: 'Get',
        async: false,
        success: function (responseData) {
            $("#txtGroupCode").val(responseData);

        },
        error: function () { }
    });
}

function LoadSizeGrid() {
    var url = '/Size/GetAll';

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

function LoadAllCombo() {
    GetAllActiveLine("ddllineNumber", true);
}

function FormDataAsObject() {
    var object = new Object();
    object.BrandName = $('#txtBrandName').val();
    object.BrandNameInBangla = $('#txtBrandNameBang').val();
    return object;
}

function ResetForm() {
    $('#txtBrandName').val('');
    $('#txtBrandNameBang').val('');
}

function EnableDisableControls(status) {
    //status = 1 for Save, 2 for Delete
    if (status == "1") {
        $('#btnSave').prop('disabled', false);
        $('#btnUpdate').prop('disabled', true);
        $('#btnDelete').prop('disabled', true);
    }
    else if (status == "2") {
        $('#btnSave').prop('disabled', true);
        $('#btnUpdate').prop('disabled', false);
        $('#btnDelete').prop('disabled', false);
    }

    else {
        $('#btnSave').prop('disabled', false);
        $('#btnUpdate').prop('disabled', false);
        $('#btnDelete').prop('disabled', false);
    }
}

function OnSelectProductGroup(GroupId) {

    $.ajax({
        url: '@Url.Action("GetAProductGroup", "ProductGroup")',
        type: 'get',
        dataType: 'json',
        async: false,
        data: {
            productGroupId: GroupId
        },
        success: function (data) {
            ResetForm();
            $('#txtGroupCode').val(data.GroupId);
            $('#txtGroupName').val(data.GroupName);
            $('#txtGroupDes').val(data.GroupDescription);
            $('#ddllineNumber').val(data.ProductLine.LineId);
            LoadProductGroupGrid();

        },
        error: function () {

        }
    });
}

function FormDataAsObject() {
    var object = new Object();
    object.Name = $('#txtSizeName').val();
    return object;
}

function Save() {
    debugger;
    if ($("#txtSizeName").val() == "") {
        alert('SizeName Is Empty.');
        return false;
    }

    var formObject = FormDataAsObject();

    $.ajax({
        url: '/Size/Create',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            Id: formObject.Id,
            Name: $('#txtSizeName').val(),
            create: 1
        },
        success: function (data) {
            ShowNotification("1", "Size Saved!!")
            ClearAddBox();
            LoadDesignList();
        },
        error: function () {

        }
    });

}

function productGroupInfoValidation(formObject) {

    if (!formObject.GroupName) {
        $('#txtGroupName').focus();
        ShowNotification('2', 'Group Name Can not be empty.');
        return false;
    }


    return true;

}

function Update() {
    var formObject = FormDataAsObject();

    if (productGroupInfoValidation(formObject)) {


        $.ajax({
            url: '@Url.Action("CreateOrUpdate", "ProductGroup")',
            method: 'post',
            dataType: 'json',
            async: false,
            data: {
                GroupId: formObject.GroupId,
                GroupName: formObject.GroupName,
                GroupDescription: formObject.GroupDescription,
                LineNumber: formObject.LineNumber,
                create: 2,
            },
            success: function (data) {
                var vmMsg = data;
                if (vmMsg.MessageType == 1) {
                    ShowNotification(1, vmMsg.ReturnMessage);
                    ResetForm();
                    LoadProductGroupGrid();
                    GenerateProductGroupId();

                } else {
                    ShowNotification(3, vmMsg.ReturnMessage);
                    // HideLoader();
                }
            },
            error: function () {
                //HideLoader();
            }
        });
    }
}

function Delete() {
    var formObject = FormDataAsObject();

    $.ajax({
        url: '@Url.Action("Delete", "ProductGroup")',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {
            GroupId: formObject.GroupId,
            GroupName: formObject.GroupName,
            GroupDescription: formObject.GroupDescription,
            LineNumber: formObject.LineNumber,
        },
        success: function (data) {
            var vmMsg = data;
            if (vmMsg.MessageType == 1) {
                ShowNotification(1, vmMsg.ReturnMessage);
                ResetForm();
                LoadProductGroupGrid();
                GenerateProductGroupId();
                //$('#BtnSave').prop('disabled', true);
                //HideLoader();
            } else {
                ShowNotification(3, vmMsg.ReturnMessage);
                // HideLoader();
            }
        },
        error: function () {
            //HideLoader();
        }
    });

}