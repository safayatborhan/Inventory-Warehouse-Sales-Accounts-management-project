using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class SizeResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CreateBy { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
    }
}