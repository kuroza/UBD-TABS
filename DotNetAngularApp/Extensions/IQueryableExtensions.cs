using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (String.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMap.ContainsKey(queryObj.SortBy))
                return query;

            if (queryObj.IsSortAscending) // if IsSortAscending == ture
                return query.OrderBy(columnsMap[queryObj.SortBy]); // string SortBy? // order by ascending
            else
                return query.OrderByDescending(columnsMap[queryObj.SortBy]); // order columnsMap by descending
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> query, IQueryObject queryObj)
        {
            if (queryObj.Page <= 0) // edge case: if query page is 0, set page == first page
                queryObj.Page = 1;
            if (queryObj.PageSize <= 0) // edge case: if query page size is 0, set the page size (number of rows in a page)
                queryObj.PageSize = 10;

            return query = query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize); // Skip? Take?
        }
    }
}