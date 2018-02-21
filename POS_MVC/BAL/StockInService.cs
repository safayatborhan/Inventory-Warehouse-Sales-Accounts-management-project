using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POS_MVC.Models;
using POS_MVC.Util;

namespace POS_MVC.BAL
{
    public class StockInService
    {
        DBService<StockIn> service = new DBService<StockIn>();
        DBService<Inventory> inventory = new DBService<Inventory>();

        public List<StockIn> GetAll()
        {
            return service.GetAll();
        }

        public StockIn GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public StockIn Save(StockIn stockIn, string Notes)
        {
            var existingItem = inventory.GetAll(a => a.ProductId == stockIn.ProductId && a.IsActive == true && a.WarehouseId == stockIn.WarehouseId).ToList();
            if (existingItem.Count > 0)
            {
                foreach (var inv in existingItem)
                {
                    inv.UpdatedDate = DateTime.Now;
                    inv.UpdatedBy = CurrentSession.GetCurrentSession().UserName;
                    inv.ReceiveQty = stockIn.BaleQty;
                    inv.GoodsType = "2";
                    inventory.Update(inv, inv.Id);
                }

            }
            else
            {
                Inventory result = new Inventory();
                Inventory FinalResult = new Inventory();

                result.ProductId = (int)stockIn.ProductId;
                result.QtyInBale = (int?)stockIn.BaleWeight;
                result.SupplierId = 1;
                result.WarehouseId = (int)stockIn.WarehouseId;
                result.ReceiveQty = stockIn.BaleQty;
                result.Notes = Notes;
                result.GoodsType = "2";
                result.CreatedBy = CurrentSession.GetCurrentSession().UserName;
                result.CreatedDate = DateTime.Now;
                result.IsActive = true;

                FinalResult = inventory.Save(result);

            }
            return service.Save(stockIn);
        }


        public StockIn Update(StockIn t, int id)
        {
            return service.Update(t, id);

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}