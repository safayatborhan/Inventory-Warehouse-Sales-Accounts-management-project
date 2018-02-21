using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace POS_MVC.BAL
{
    public class DBService <T> where T : class
    {
        DbContextRepository<T> entity = new DbContextRepository<T>();
        public List<T> GetAll()
        {
            return entity.GetAll().ToList();
        }
        public IQueryable<T> GetAll(Expression<Func<T, bool>> predicate)
        {
            return entity.Query(predicate);
        }

        public T GetById(int? id = 0)
        {
            return entity.GetById(id);
        }

        public T Save(T cat)
        {
            entity.Add(cat);
            this.entity.SaveChanges();
            return cat;

        }
        public T Update(T t, int id)
        {
            entity.Update(t, id);
            this.entity.SaveChanges();
            return t;

        }
        public int Delete(int id)
        {
            var entitybyid= GetById(id);
            entity.Delete(entitybyid);
            return entity.SaveChanges();
        }
    }
}