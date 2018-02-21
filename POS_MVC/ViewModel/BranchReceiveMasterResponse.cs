using System;
using System.Collections.Generic;

namespace POS_MVC.ViewModel
{
    public class BranchReceiveMasterResponse
    {
        public int Id { get; set; }
        public string GRNo { get; set; }
        public string PONO { get; set; }
        public int SupplierID { get; set; }
        public Nullable<System.DateTime> GRDate { get; set; }
        public Nullable<decimal> AdditionalCost { get; set; }
        public Nullable<decimal> BillDiscount { get; set; }
        public Nullable<decimal> GrandTotal { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public int BranchId { get; set; }
        public string Notes { get; set; }
        public Nullable<int> IsApproved { get; set; }
        public Nullable<int> IsRecieved { get; set; }

        public virtual BranchResponse Branch { get; set; }
        public virtual SupplierResponse Supplier { get; set; }
    }
}