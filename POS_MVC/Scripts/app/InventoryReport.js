
$(document).ready(function () {
    LoadAllWareHouse("ddlWareHouse");
    LoadAllProduct("ddlProduct");
    $('#inventoryReportTableModal').DataTable({
         "ajax": {
                "dataType": 'json',
                "contentType": "application/json; charset=utf-8",
                "type": "POST",
                "url": "/Product/GetAll",
                "dataSrc": function (json) {
                    console.log(json);
                   return json;
                }
            },
        "columns": [
            { "data": "Id" },
            { "data": "ProductName" }

        ],
        "columnDefs": [{
            "targets": 1,
            "data": "Id",
            "render": function (data, type, row, meta) {
                return '<a  onclick="window.location.href=\'/enroller_details.html?id=' + row.Id + '\'">' + row.ProductName + '</a>';
            }
        }],
        "dom": 'Bfrtip',
        "buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
});

