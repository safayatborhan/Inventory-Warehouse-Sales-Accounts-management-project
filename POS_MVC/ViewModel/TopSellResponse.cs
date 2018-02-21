using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class TopSellResponse
    {
        public int ItemId { get; set; }
        public string ProductName { get; set; }
        public string DesignName { get; set; }
        public double SalesQty { get; set; }
        public decimal RetailPrice { get; set; }
        public double TotalSalesAmount { get; set; }
    }
}