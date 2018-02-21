using POS_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS_MVC.BAL
{
    public class LedgerPostingService
    {
        DBService<LedgerPosting> service = new DBService<LedgerPosting>();
        public List<LedgerPosting> GetAll()
        {
            return service.GetAll().ToList();
        }
        public LedgerPosting GetById(int? id = 0)
        {
            return service.GetById(id);
        }

        public LedgerPosting Save(LedgerPosting cus)
        {
            var isExists = service.GetAll().Where(a => a.InvoiceNo == cus.InvoiceNo && a.LedgerId == cus.LedgerId).FirstOrDefault();
            if (isExists != null)
            {
                return null;
            }
            service.Save(cus);
            return cus;

        }
        public LedgerPosting Update(LedgerPosting t, int id)
        {
            return service.Update(t, id);
        }
        public int Delete(int id)
        {
            return service.Delete(id);
        }
    }
}