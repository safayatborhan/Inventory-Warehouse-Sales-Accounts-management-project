using POS_MVC.Models;
using POS_MVC.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace POS_MVC.BAL
{
    public class InventoryService
    {
        DBService<Inventory> service = new DBService<Inventory>();

        public List<Inventory> GetAllForSale()
        {
            return service.GetAll(a => a.GoodsType == "2").ToList();
        }

        public List<Inventory> GetAll()
        {
            return service.GetAll(a => a.GoodsType == "1" || a.GoodsType == "3").ToList();
        }

        public List<Inventory> GetAllPaddy()
        {
            return service.GetAll(a => a.GoodsType == "1").ToList();
        }

        public List<Inventory> GetAllPaddyFilteredBySupplier(int supplierId)
        {
            return service.GetAll(a => a.GoodsType == "1" && a.SupplierId == supplierId).ToList();
        }

        public List<Inventory> GetAllPaddyFilteredByWarehouse(int warehouseId)
        {
            return service.GetAll(a => a.GoodsType == "1" && a.WarehouseId == warehouseId).ToList();
        }

        public List<Inventory> GetAllRice()
        {
            return service.GetAll(a => a.GoodsType == "3").ToList();
        }

        public List<Inventory> GetAllRiceFilteredBySupplier(int supplierId)
        {
            return service.GetAll(a => a.GoodsType == "3" && a.SupplierId == supplierId).ToList();
        }

        public List<Inventory> GetAllRiceFilteredByWarehouse(int warehouseId)
        {
            return service.GetAll(a => a.GoodsType == "3" && a.WarehouseId == warehouseId).ToList();
        }

        public List<Inventory> GetAllFinishGoods()
        {
            return service.GetAll(a => a.GoodsType == "2").ToList();
        }

        public List<Inventory> GetAllFinishGoodsFilteredBySupplier(int supplierId)
        {
            return service.GetAll(a => a.GoodsType == "2" && a.SupplierId == supplierId).ToList();
        }

        public List<Inventory> GetAllFinishGoodsFilteredByWarehouse(int warehouseId)
        {
            return service.GetAll(a => a.GoodsType == "2" && a.WarehouseId == warehouseId).ToList();
        }

        public Inventory GetInventory(int ItemId,int WarehouseId, int SupplierId)
        {
           return service.GetAll(a => a.IsActive == true && a.SupplierId == SupplierId && a.WarehouseId == WarehouseId).FirstOrDefault();
        }
 
        public Inventory GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public Inventory InventoryIncrement(Inventory cus)
        {
            var inventory = new Inventory();
            var existing = service.GetAll(a => a.SupplierId == cus.SupplierId && a.WarehouseId == cus.WarehouseId).FirstOrDefault();
            if (existing!=null)
            {
                existing.BalanceQty += cus.BalanceQty;
                existing.ReceiveQty = cus.ReceiveQty;
                inventory=service.Update(existing,existing.Id);
            }
            else
            {
                inventory= service.Save(cus);
            }
            return inventory;
        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }

        public Inventory Update(Inventory inv)
        {
            return service.Update(inv, inv.Id);
        }
    }
}