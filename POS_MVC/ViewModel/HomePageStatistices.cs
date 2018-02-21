using System.Collections.Generic;
using POS_MVC.Models;
using POS_MVC.ViewModel;

namespace POS_MVC.Controllers
{
    public class HomePageStatistices
    {
        public HomePageStatistices()
        {
        }

        public double TodaySales { get; internal set; }
        public List<TopSellResponse> TopSell { get;  set; }
        public int TotalBranch { get; internal set; }
        public decimal TotalInventory { get; internal set; }
    }
}