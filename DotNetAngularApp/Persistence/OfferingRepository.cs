using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;
using DotNetAngularApp.Extensions;
using System.Collections;

namespace DotNetAngularApp.Persistence
{
    public class OfferingRepository : IOfferingRepository
    {
        private readonly TabsDbContext context;
        public OfferingRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<Offering> GetOffering(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Offerings.FindAsync(id);

            return await context.Offerings
                .Include(o => o.Semester)
                .Include(o => o.Module)
                    .ThenInclude(o => o.Major)
                .Include(o => o.Lecturers)
                    .ThenInclude(o => o.Lecturer)
                .SingleOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Offering>> GetAllOfferings()
        {
            return await context.Offerings
                .Include(o => o.Semester)
                .Include(o => o.Module)
                    .ThenInclude(o => o.Major)
                .Include(o => o.Lecturers)
                    .ThenInclude(o => o.Lecturer)
                .OrderBy(o => o.Module.Code)
                .ToListAsync();
        }

        public void Add(Offering offering)
        {
            context.Offerings.Add(offering);
        }

        public void Remove(Offering offering)
        {
            context.Remove(offering);
        }

        public bool OfferingExist(Offering offering)
        {
            var result = context.Offerings
                .Where(o => o.SemesterId == offering.SemesterId)
                .Where(o => o.ModuleId == offering.ModuleId)
                .Count();

            if (result > 0)
                return true;
            else
                return false;
        }

        public bool EditOfferingExist(Offering offering)
        {
            var result = context.Offerings
                .Where(o => o.Id != offering.Id)
                .Where(o => o.SemesterId == offering.SemesterId)
                .Where(o => o.ModuleId == offering.ModuleId)
                .Count();

            if (result > 0)
                return true;
            else
                return false;
        }
    }
}