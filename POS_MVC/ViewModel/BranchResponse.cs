using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class BranchResponse
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string Road { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Web { get; set; }
        public string PostalCode { get; set; }
        public string LogoURL { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public int CompanyId { get; set; }
        public Nullable<bool> IsHeadOffice { get; set; }

        //public virtual CompanyResponse Company { get; set; }
        //public virtual ICollection<BranchInventoryResponse> BranchInventory { get; set; }
        //public virtual ICollection<BranchReceiveMasterResponse> BranchReceiveMaster { get; set; }
        //public virtual ICollection<CustomerResponse> Customers { get; set; }
        //public virtual ICollection<EmployeeResponse> Employees { get; set; }
        //public virtual ICollection<ShopTransferResponse> ShopTransfer { get; set; }

    }
}