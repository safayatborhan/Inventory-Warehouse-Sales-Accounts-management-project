using System;

namespace POS_MVC.ViewModel
{
    public class SalesDetailResponse
    {
        public int Id { get; set; }
        public int SalesMasterId { get; set; }
        public string SalesId { get; set; }
        public int ItemId { get; set; }
        public double QTY { get; set; }
        public Nullable<double> Price { get; set; }
        public string Currency { get; set; }
        public double Amount { get; set; }
        public Nullable<double> VATValue { get; set; }
        public Nullable<double> VATAmount { get; set; }
        public Nullable<double> Discount { get; set; }
        public Nullable<double> NetAmount { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }

        public virtual ItemResponse Item { get; set; }
    }
}