using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace POS_MVC.ViewModel
{
    public class ReceiveMasterResponse
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public string InvoiceNoPaper { get; set; }
        public int SupplierID { get; set; }
        public string RecieveFrom { get; set; }
        public System.DateTime InvoiceDate { get; set; }
        public decimal AdditionalCost { get; set; }
        public decimal BillDiscount { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal TotalAmount { get; set; }
        public string MarketType { get; set; }
        public string TransportType { get; set; }
        public string TransportNo { get; set; }
        public string Notes { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public bool IsActive { get; set; }

        [ScriptIgnore(ApplyToOverrides = true)]
        public ICollection<ReceiveDetailResponse> ReceiveDetails { get; set; }
        public SupplierResponse Supplier { get; set; }
    }
}