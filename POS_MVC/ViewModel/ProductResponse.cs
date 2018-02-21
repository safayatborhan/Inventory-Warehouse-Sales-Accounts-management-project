using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POS_MVC.Models;
using System.Web.Script.Serialization;

namespace POS_MVC.ViewModel
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string ProductName { get; set; }
        public string ProductNameBangla { get; set; }
        public Nullable<int> CategoryId { get; set; }
        public string ProductType { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public bool IsActive { get; set; }


        public CategoryResponse Category { get; set; }
        //[ScriptIgnore(ApplyToOverrides = true)]
        //public ICollection<InventoryResponse> Inventories { get; set; }
        //public ICollection<ReceiveDetailResponse> ReceiveDetails { get; set; }
        //public ICollection<SalesDetailResponse> SalesDetails { get; set; }
        //public ICollection<SalesOrderResponse> SalesOrders { get; set; }
        //public ICollection<StockInResponse> StockIns { get; set; }
        //public ICollection<StockOutResponse> StockOuts { get; set; }
    }
}