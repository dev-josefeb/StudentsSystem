using API.DataModels;
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

        public List<Student> GetStudents()
        {
            return context.Student
                .Include(nameof(Gender))
                .Include(nameof(Address))
                .ToList();
        }
    }
}
