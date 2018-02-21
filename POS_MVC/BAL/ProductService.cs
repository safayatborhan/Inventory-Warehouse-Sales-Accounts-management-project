using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class ProductService
    {
        DBService<Product> service = new DBService<Product>();
        public List<Product> GetAll(int type)
        {
            if (type==0)
            {
                return service.GetAll(a => a.IsActive == true).ToList();

            }
            //return service.GetAll();
            return service.GetAll(a => a.IsActive == true && a.ProductType==type.ToString()).ToList();
        }

        public List<Product> GetAllProductForStockIn()
        {
            return service.GetAll(p => p.ProductType == "2" && p.IsActive == true).ToList();
        }

        public Product GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public Product Save(Product cus)
        {
            return service.Save(cus);

        }
        public Product Update(Product t, int id)
        {
            return service.Update(t, id);

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}