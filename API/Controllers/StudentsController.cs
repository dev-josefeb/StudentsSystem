using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Student = API.Domain_Models.Student;
using AutoMapper;
using API.Domain_Models;
using API.DataModels;

namespace API.Controllers
{
    [ApiController]
    public class StudentsController : Controller
    {
        private readonly IStudentRepository studentRepository;
        private readonly IMapper mapper;

        public StudentsController(IStudentRepository studentRepository, IMapper mapper)
        {
            this.studentRepository = studentRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await studentRepository.GetStudentsAsync();
            return Ok(mapper.Map<List<Student>>(students));
        }

        [HttpGet]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> GetStudent([FromRoute] Guid studentId)
        {
            var student = await studentRepository.GetStudentAsync(studentId);

            if (student is null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Student>(student));
        }

        [HttpPut]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> UpdateStudentAsync([FromRoute] Guid studentId, [FromBody] UpdateStudentRequest request )
        {
            if (!await studentRepository.Exists(studentId))
            {
                return NotFound();
            }

            var updatedStudent =  await studentRepository.UpdateStudent(studentId, mapper.Map<DataModels.Student>(request));
            if(updatedStudent is not null)
            {
                return Ok(mapper.Map<Student>(updatedStudent));
            }

            return NotFound();
        }
    }
}
