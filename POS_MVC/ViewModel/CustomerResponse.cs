using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class CustomerResponse
    {
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
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedDate { get; set; }
        public bool IsActive { get; set; }

    }
}