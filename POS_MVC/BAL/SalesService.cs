using POS_MVC.Models;
using POS_MVC.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class SalesService
    {  // SQLDAL objSqlData = new SQLDAL();
        DBService<SalesMaster> service = new DBService<SalesMaster>();
        DBService<SalesDetail> salesDetails = new DBService<SalesDetail>();
        ricemillEntities entity = new ricemillEntities();
        InventoryService inventoryService = new InventoryService();
        Result oResult = new Result();


        DBService<SalesOrder> serviceSalesOrder = new DBService<SalesOrder>();
        DBService<SalesMaster> serviceSalesMaster = new DBService<SalesMaster>();
        DBService<SalesDetail> serviceSalesDetail = new DBService<SalesDetail>();
        DBService<Inventory> inventory = new DBService<Inventory>();
        DBService<LedgerPosting> ledgerService = new DBService<LedgerPosting>();
        //   DBService<ShopTransfer> service = new DBService<ShopTransfer>();
        public List<SalesMaster> GetAll()
        {
            return service.GetAll(a => a.IsActive == true).ToList();
        }

        public List<SalesMaster> GetAllSalesFilteredByCustomer(int customerId)
        {
            return service.GetAll(a => a.CustomerID == customerId && a.IsActive == true).ToList();
        }

        public List<SalesMaster> GetAllSalesFilteredByDateForReport(DateTime startDate, DateTime endDate)
        {
            return service.GetAll(a => a.IsActive == true && (a.CreatedDate >= startDate && a.CreatedDate < endDate)).ToList();
        }

        public List<SalesMaster> GetAllSalesFilteredByDateAndCustomerForReport(DateTime startDate, DateTime endDate, int customerId)
        {
            return service.GetAll(a => a.IsActive == true && (a.CreatedDate >= startDate && a.CreatedDate < endDate) && a.CustomerID == customerId).ToList();
        }

        public List<TopSellResponse> GetTopSell()
        {
            var result = (from i in entity.SalesDetails
                          group i by i.ProductId  into g
                   select new TopSellResponse()
                   {                       
                       ItemId=g.Key,
                       ProductName = g.Where(a => a.ProductId == g.Key).FirstOrDefault().Product.ProductName,
                   }).ToList().OrderByDescending(a=>a.SalesQty);
            return result.ToList();

        }
        public SalesMaster GetById(int? id = 0)
        {
            return service.GetById(id);
        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }

        public  List<SalesMaster> GetTodaysSales()
        {
            DateTime today = DateTime.Now.Date;
            return service.GetAll(a => a.IsActive == true && EntityFunctions.TruncateTime(a.SalesDate).Value == today).ToList();
        }



        //Sales order service
        public SalesOrder SaveSalesOrder(SalesOrder salesOrder)
        {
            return serviceSalesOrder.Save(salesOrder);
        }


        public SalesMaster SaveSalesMaster(SalesMaster salesMaster)
        {
            var result = serviceSalesMaster.Save(salesMaster);
            if (result != null || result.Id > 0)
            {
                foreach (var item in salesMaster.SalesDetails)
                {
                    var existingItem = inventory.GetAll(a => a.ProductId == item.ProductId && a.IsActive == true && a.QtyInBale == item.BaleQty).ToList();
                    if (existingItem.Count > 0)
                    {
                        foreach (var inv in existingItem)
                        {
                            inv.UpdatedDate = DateTime.Now;
                            inv.UpdatedBy = "";
                            inv.BalanceQty = inv.BalanceQty - item.BaleQty;
                            inventory.Update(inv, inv.Id);
                        }
                    }

                }
                // Ledger Saves
                var ledgerObj = new LedgerPosting();
                ledgerObj.YearId = 1;
                ledgerObj.VoucherTypeId = 14;
                ledgerObj.VoucherNo = result.SalesInvoice;
                ledgerObj.PostingDate = result.SalesDate;
                ledgerObj.LedgerId = 3;
                ledgerObj.InvoiceNo = result.SalesInvoice;
                ledgerObj.Credit = result.TotalAmount;
                ledgerObj.Debit = result.TotalAmount;
                var save = ledgerService.Save(ledgerObj);
            }
            return result;

        }


        public SalesDetail SaveSalesDetail(SalesDetail salesDetail)
        {
            return serviceSalesDetail.Save(salesDetail);
        }

        public List<SalesOrder> GetAllSalesOrders()
        {
            return serviceSalesOrder.GetAll().ToList();
        }

        public List<SalesOrder> GetAllSalesOrdersByCustomerId(int? CustomerId)
        {
            return serviceSalesOrder.GetAll(c => c.CustomerID == CustomerId).ToList();
        }

        public SalesOrder GetSalesOrderById(int? id = 0)
        {
            return serviceSalesOrder.GetById(id);
        }

        public SalesOrder Update(SalesOrder t, int id)
        {
            return serviceSalesOrder.Update(t, id);

        }
    }
}