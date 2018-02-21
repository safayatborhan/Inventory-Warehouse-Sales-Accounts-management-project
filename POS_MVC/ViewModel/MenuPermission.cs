using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class MenuPermission
    {
        public Screen MainModule { get; set; }
        public List<Screen> SubModules{get;set;}
    }
}