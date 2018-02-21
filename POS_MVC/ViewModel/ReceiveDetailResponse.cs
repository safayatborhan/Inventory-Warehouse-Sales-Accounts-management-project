using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class ReceiveDetailResponse
    {
        public ReceiveDetailResponse()
        {
            
        }

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