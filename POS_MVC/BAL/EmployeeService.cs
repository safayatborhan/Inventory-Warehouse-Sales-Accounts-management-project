using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class EmployeeService
    {
        DBService<Employee> service = new DBService<Employee>();
        public List<Employee> GetAll()
        {
            return service.GetAll(a => a.IsActive == true).ToList();
        }
        public Employee GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public Employee Save(Employee cus)
        {
            return service.Save(cus);

        }
        public Employee Update(Employee t, int id)
        {
            return service.Update(t, id);

        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}