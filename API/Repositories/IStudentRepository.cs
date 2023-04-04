using API.DataModels;

namespace API.Repositories
{
    public interface IStudentRepository
    {
        List<Student> GetStudents();
    }
}
