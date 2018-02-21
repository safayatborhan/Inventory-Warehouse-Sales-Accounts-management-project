using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class SupplierResponse
    {
        public SupplierResponse()
        {
        }

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactPersonPhone { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Web { get; set; }
        public string Creator { get; set; }
        public Nullable<System.DateTime> CreationDate { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string Remarks { get; set; }
    }
}