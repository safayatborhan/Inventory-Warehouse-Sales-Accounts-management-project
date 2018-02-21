using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using POS_MVC.Models;

namespace POS_MVC.BAL
{
    public class AccountLedgerService
    {
        DBService<AccountLedger> service = new DBService<AccountLedger>();
        public List<AccountLedger> GetAll()
        {
            return service.GetAll().ToList();
        }
        public AccountLedger GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public AccountLedger Save(AccountLedger cus)
        {
            service.Save(cus);
            return cus;
        }
        public AccountLedger Update(AccountLedger t, int id)
        {
            return service.Update(t, id);
        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}