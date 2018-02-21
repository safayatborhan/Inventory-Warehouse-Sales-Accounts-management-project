using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class CustomerService
    {
        DBService<Customer> service = new DBService<Customer>();
        public List<Customer> GetAll()
        {
            //return service.GetAll();
            return service.GetAll(a => a.IsActive == true).ToList();
        }
        public Customer GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public Customer Save(Customer cus)
        {                    
            return service.Save(cus);

        }
        public Customer Update(Customer t, int id)
        {
           return service.Update(t, id);      

        }
        public int Delete(int id)
        {                    
            return service.Delete(id);
        }
    }
}