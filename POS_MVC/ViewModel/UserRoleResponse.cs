using System;
using System.Collections.Generic;

namespace POS_MVC.ViewModel
{
    public class UserRoleResponse
    {
        public UserRoleResponse()
        {
            this.UserInfoes = new HashSet<UserInfoResponse>();
        } 
        public int Id { get; set; }
        public string RoleName { get; set; }
        public int TenancyId { get; set; }
        public Nullable<DateTime> SetDate { get; set; }
        public virtual ICollection<UserInfoResponse> UserInfoes { get; set; }
    }
}