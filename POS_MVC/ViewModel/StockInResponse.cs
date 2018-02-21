using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class StockInResponse
    {
        public StockInResponse()
        {
            
        }

        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public string StockOutInvoiceNo { get; set; }
        public Nullable<int> ProductId { get; set; }
        public Nullable<decimal> BaleWeight { get; set; }
        public Nullable<int> WarehouseId { get; set; }
        public Nullable<int> SupplierId { get; set; }
        public Nullable<System.DateTime> ProductionDate { get; set; }
        public Nullable<decimal> BaleQty { get; set; }
        public Nullable<decimal> WeightInMon { get; set; }
        public string Notes { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public bool IsActive { get; set; }

        public ProductResponse Product { get; set; }
        public SupplierResponse Supplier { get; set; }
        public WareHouseResponse WareHouse { get; set; }
    }
}