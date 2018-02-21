using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.ViewModel
{
    public class ShopTransferResponse
    {
        public int Id { get; set; }
        public int ShopID { get; set; }
        public string TransferNo { get; set; }
        public int TransferBy { get; set; }
        public Nullable<System.DateTime> TransferDate { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public bool IsActive { get; set; }
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public string Barcode1 { get; set; }
        public decimal RetailPrice { get; set; }
        public decimal CostPrice { get; set; }
        public decimal WholeSalesPrice { get; set; }
    }
}