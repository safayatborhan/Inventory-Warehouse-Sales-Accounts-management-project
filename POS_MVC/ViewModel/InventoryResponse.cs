using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class InventoryResponse
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Nullable<int> QtyInBale { get; set; }
        public int SupplierId { get; set; }
        public int WarehouseId { get; set; }
        public Nullable<decimal> OpeningQty { get; set; }
        public Nullable<decimal> ReceiveQty { get; set; }
        public Nullable<decimal> AddFromOtherSource { get; set; }
        public Nullable<decimal> ProductionQty { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
        public Nullable<decimal> Faulty { get; set; }
        public decimal BalanceQty { get; set; }
        public decimal BalanceQtyInKG { get; set; }
        public string Notes { get; set; }
        public string GoodsType { get; set; }
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