using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class TaxService
    {
        DBService<Tax> service = new DBService<Tax>();
        public List<Tax> GetAll()
        {
            return service.GetAll();
        }
        public Tax GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public Tax Save(Tax cus)
        {
            return service.Save(cus);

        }
        public Tax Update(Tax t, int id)
        {
            return service.Update(t, id);

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}