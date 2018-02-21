using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class SupplierService
    {
        DBService<Supplier> service = new DBService<Supplier>();
        public List<Supplier> GetAll()
        {
            //return service.GetAll();
            return service.GetAll(a => a.IsActive == true).ToList();
        }
        public Supplier GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public Supplier Save(Supplier cus)
        {
            return service.Save(cus);

        }
        public Supplier Update(Supplier t, int id)
        {
            return service.Update(t, id);

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}