using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class BrandService
    {
        DBService<Brand> service = new DBService<Brand>();
        public List<Brand> GetAll()
        {
            return service.GetAll();
        }
        public Brand GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public Brand Save(Brand cus)
        {
             service.Save(cus);
            return cus;

        }
        public Brand Update(Brand t, int id)
        {
             service.Update(t, id);
            return t;

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}