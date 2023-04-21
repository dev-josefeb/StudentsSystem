using API.DataModels;

namespace API.Repositories
{
    public interface IStudentRepository
    {
        Task<List<Student>> GetStudentsAsync();

        Task<Student> GetStudentAsync(Guid studentId);

        Task<List<Gender>> GetGendersAsync();

        Task<bool> Exists(Guid studentId);

        Task<Student> UpdateStudentAsync(Guid studentId, Student student);

        Task<Student> DeleteStudentAsync(Guid studentId);
    }
}
