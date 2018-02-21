using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class CategoryResponse
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string CategoryName { get; set; }
        public string Descriptions { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdateDate { get; set; }
        public bool IsActive { get; set; }

        //public ICollection<ProductResponse> Products { get; set; }
    }
}