using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class GoodsReceiveResponse
    {
        //public int ItemId { get; set; }
        //public int SupplierId { get; set; }
        //public int WareHouseId { get; set; }
        //public decimal CostPrice { get; set; }
        //public decimal RetailPrice { get; set; }
        //public decimal WholeSalesPrice { get; set; }
        //public decimal QTY { get; set; }
        //public string IsWarenty { get; set; }
        //public bool IsActive { get; set; }


        public int Id { get; set; }
        public int ReceiveMasterId { get; set; }
        public int ProductId { get; set; }
        public Nullable<int> WarehouseId { get; set; }
        public decimal TotalBale { get; set; }
        public int QtyInBale { get; set; }
        public decimal WeightInKG { get; set; }
        public decimal WeightType { get; set; }
        public decimal WeightInMon { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalAmount { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public bool IsActive { get; set; }

        public ProductResponse Product { get; set; }
        public ReceiveMasterResponse ReceiveMaster { get; set; }
        public WareHouseResponse WareHouse { get; set; }
    }
}