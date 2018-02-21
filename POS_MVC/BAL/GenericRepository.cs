using POS_MVC.BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace POS_MVC.BAL
{
    public interface IRepository<T> : IDisposable where T : class
    {
        void Add(T entity);
        void Update(T entity, int id);
        void Delete(T entity);
        T GetById(object key);
        IQueryable<T> Query(Expression<Func<T, bool>> predicate);
        IQueryable<T> GetAll();
        int SaveChanges();
        int SaveChanges(bool validateEntities);
    }

    public abstract class GenericRepository<T> : IRepository<T> where T : class
    {
        public abstract void Add(T entity);
        public abstract void Update(T entity, int id);
        public abstract void Delete(T entity);
        public abstract T GetById(object key);
        public abstract IQueryable<T> Query(Expression<Func<T, bool>> predicate);
        public abstract IQueryable<T> GetAll();
        public int SaveChanges()
        {
            return SaveChanges(true);
        }
        public abstract int SaveChanges(bool validateEntities);
        public abstract void Dispose();
    }
}