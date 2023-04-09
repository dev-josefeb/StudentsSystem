﻿using API.DataModels;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly StudentAdminContext context;

        public StudentRepository(StudentAdminContext context)
        {
            this.context = context;
        }

        public async Task<List<Student>> GetStudentsAsync()
        {
            return await context.Student
                .Include(nameof(Gender))
                .Include(nameof(Address))
                .ToListAsync();
        }
    }
}