using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POS_MVC.Models;
using POS_MVC.Util;

namespace POS_MVC.BAL
{
    public class StockOutService
    {
        DBService<StockOut> service = new DBService<StockOut>();
        DBService<Inventory> inventory = new DBService<Inventory>();

        public List<StockOut> GetAll()
        {
            return service.GetAll();
        }

        public StockOut GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public StockOut Save(StockOut stockOut)
        {
            var existingItem = inventory.GetAll(a => a.ProductId == stockOut.ProductId &&  a.QtyInBale==stockOut.BaleWeight && a.IsActive == true && a.WarehouseId == stockOut.WarehouseId && a.SupplierId == stockOut.SupplierId).ToList();
            if (existingItem.Count > 0)
            {
                foreach (var inv in existingItem)
                {
                    inv.UpdatedDate = DateTime.Now;
                    inv.UpdatedBy = CurrentSession.GetCurrentSession().UserName;
                    inv.ProductionQty = stockOut.BaleQty;
                    inv.BalanceQty = inv.BalanceQty - stockOut.BaleQty??0;
                    inventory.Update(inv, inv.Id);
                }

            }
            return service.Save(stockOut);
        }

        public StockOut Update(StockOut t, int id)
        {
            return service.Update(t, id);

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}