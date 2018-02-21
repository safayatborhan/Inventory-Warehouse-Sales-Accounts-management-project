using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class GoodsReceiveService
    {
        DBService<ReceiveMaster> service = new DBService<ReceiveMaster>();
        DBService<Inventory> inventory = new DBService<Inventory>();
        DBService<LedgerPosting> ledgerService = new DBService<LedgerPosting>();
        public List<ReceiveMaster> GetAll()
        {
            return service.GetAll();
        }
        public ReceiveMaster GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public ReceiveMaster Save(ReceiveMaster cus,int wareHouseId, int goodsType)
        {
            var result= service.Save(cus);
            if (result != null || result.Id > 0)
            {
                foreach (var item in cus.ReceiveDetails)
                {
                    var existingItem = inventory.GetAll(a=>a.ProductId==item.ProductId && a.IsActive==true && a.WarehouseId==wareHouseId && a.SupplierId==cus.SupplierID && a.QtyInBale==item.QtyInBale).ToList();
                    if (existingItem.Count>0)
                    {
                        foreach (var inv in existingItem)
                        {
                            inv.UpdatedDate = DateTime.Now;
                            inv.UpdatedBy = "";
                            inv.BalanceQty = inv.BalanceQty + item.TotalBale;
                            inv.ReceiveQty = inv.ReceiveQty + item.QtyInBale;
                            inventory.Update(inv, inv.Id);
                        }

                    }
                    else
                    {
                        Inventory inv = new Inventory();
                        inv.IsActive = true;
                        inv.ProductId = item.ProductId;
                        inv.ReceiveQty = item.TotalBale;
                        inv.QtyInBale = item.QtyInBale;
                        inv.SupplierId = cus.SupplierID;
                        inv.WarehouseId = wareHouseId;
                        inv.OpeningQty = 0;
                        inv.BalanceQty = item.TotalBale;
                        inv.GoodsType = goodsType.ToString();
                        inventory.Save(inv);
                    }

                }
                // Ledger Saves
                var ledgerObj = new LedgerPosting();
                ledgerObj.YearId = 1;
                ledgerObj.VoucherTypeId = 14;
                ledgerObj.VoucherNo = result.InvoiceNoPaper;
                ledgerObj.PostingDate = cus.InvoiceDate;
                ledgerObj.LedgerId = 2;
                ledgerObj.InvoiceNo = cus.InvoiceNo;
                ledgerObj.Credit = cus.TotalAmount;
                ledgerObj.Debit = cus.TotalAmount;
                var save = ledgerService.Save(ledgerObj);
            }
            return cus;

        }
        public ReceiveMaster Update(ReceiveMaster t, int id)
        {
            service.Update(t, id);
            return t;

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }

        public List<ReceiveMaster> GetAllPaddyRecieveForReport()
        {
            return service.GetAll(a => a.IsActive == true && a.MarketType == "Not Local").ToList();
        }

        public List<ReceiveMaster> GetAllPaddyRecieveFilteredBySupplierForReport(int supplierId)
        {
            return service.GetAll(a => a.IsActive == true && a.MarketType == "Not Local" && a.SupplierID == supplierId).ToList();
        }

        public List<ReceiveMaster> GetAllPaddyRecieveFilteredByDateForReport(DateTime startDate, DateTime endDate)
        {
            return service.GetAll(a => a.IsActive == true && a.MarketType == "Not Local" && (a.CreatedDate >= startDate && a.CreatedDate < endDate))
                .ToList();
        }

        public List<ReceiveMaster> GetAllPaddyRecieveFilteredByDateAndSupplierForReport(DateTime startDate, DateTime endDate, int supplierId)
        {
            return service.GetAll(a => a.IsActive == true && a.MarketType == "Not Local" && (a.CreatedDate >= startDate && a.CreatedDate < endDate) && a.SupplierID==supplierId)
                .ToList();
        }


        public List<ReceiveMaster> GetAllRiceRecieveForReport()
        {
            return service.GetAll(a => a.IsActive == true && a.MarketType == "Local").ToList();
        }

        public List<ReceiveMaster> GetAllRiceRecieveFilteredBySupplierForReport(int supplierId)
        {
            return service.GetAll(a => a.IsActive == true && a.MarketType == "Local" && a.SupplierID == supplierId).ToList();
        }

        public List<ReceiveMaster> GetAllRiceRecieveFilteredByDateForReport(DateTime startDate, DateTime endDate)
        {
            return service.GetAll(a => a.IsActive == true && a.MarketType == "Local" && (a.CreatedDate >= startDate && a.CreatedDate < endDate))
                .ToList();
        }

        public List<ReceiveMaster> GetAllRiceRecieveFilteredByDateAndSupplierForReport(DateTime startDate, DateTime endDate, int supplierId)
        {
            return service.GetAll(a => a.IsActive == true && a.MarketType == "Local" && (a.CreatedDate >= startDate && a.CreatedDate < endDate) && a.SupplierID == supplierId)
                .ToList();
        }
    }
}