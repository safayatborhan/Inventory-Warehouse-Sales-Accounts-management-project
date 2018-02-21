function LoadStatistices() {
    var url = '/HomePage/GetStatistices';
    $.ajax({
        url: url,
        method: 'POST',
        success: function (res) {
            console.log(res);
            $("#totalBranch").text(res.TotalBranch);
            $("#totalSales").text(res.TodaySales);

            var templateWithData = Mustache.to_html($("#templateProductGroupModal").html(), { ProductGroupSearch: res.TopSell });
            $("#div-product-add").empty().html(templateWithData);
            MakePagination('productGroupTableModal');
        },
        error: function (err) {
            console.log(err);
        }
    });
}