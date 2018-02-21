using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class ItemResponse
    {
        public int Id { get; set; }
        public string Barcode1 { get; internal set; }
        public string ColorName { get; internal set; }
        public string DesignName { get; internal set; }
        public string ProductName { get; internal set; }
        public string Size { get; internal set; }
        public string SBarCode { get; set; }
        public string PBarCode { get; set; } 
        public string Barcode2 { get; set; }
        public string ItemDescription { get; set; }
        public string ProductDescription { get; set; }
        public Nullable<decimal> CostPrice { get; set; }
        public Nullable<decimal> RetailPrice { get; set; }
        public Nullable<decimal> WholeSalesPrice { get; set; }
        public Nullable<decimal> MRP { get; set; }
        public Nullable<decimal> VatPercent { get; set; }
        public Nullable<decimal> DiscountPercent { get; set; }
        public Nullable<decimal> IncentiveDeclaration { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdateBy { get; set; }
        public string UpdateDate { get; set; }
        public bool IsActive { get; set; }
        public string ProductInfo { get; set; }
        public decimal BalanceQty { get; set; }
        public string Name { get; set; }
        public string BrandName { get; set; }
    }
}