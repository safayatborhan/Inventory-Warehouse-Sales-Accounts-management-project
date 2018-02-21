using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POS_MVC.Models;

namespace POS_MVC.ViewModel
{
    public class SalesDeliveryResponse
    {
        public SalesDeliveryResponse()
        {
            
        }

        public int Id { get; set; }
        public string SalesInvoice { get; set; }
        public Nullable<int> SalesMasterId { get; set; }
        public Nullable<System.DateTime> DeliveryDate { get; set; }
        public string DriverName { get; set; }
        public string DriverMobileNo { get; set; }
        public int CustomerID { get; set; }
        public Nullable<decimal> AdditionalCost { get; set; }
        public string TransportType { get; set; }
        public string TransportNo { get; set; }
        public string ExpenseBy { get; set; }
        public string Notes { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedDate { get; set; }
        public bool IsActive { get; set; }

        public CustomerResponse Customer { get; set; }
        public SalesMasterResponse SalesMaster { get; set; }
    }
}