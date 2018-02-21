using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.Models
{
    public class AppSession
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int UserRoleId { get; set; }
        public bool UserStatus { get; set; }
        public int? BranchId { set; get; }
        public string UserTenancyName { set; get; }
        public string UserTenancyAddress { set; get; }

    }
}