using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Student = API.Domain_Models.Student;
using AutoMapper;
using API.Domain_Models;

namespace API.Controllers
{
    [ApiController]
    public class StudentsController : Controller
    {
        private readonly IStudentRepository studentRepository;
        private readonly IImageRepository imageRepository;
        private readonly IMapper mapper;

        public StudentsController(IStudentRepository studentRepository, IImageRepository imageRepository, IMapper mapper)
        {
            this.studentRepository = studentRepository;
            this.imageRepository = imageRepository;
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
        [Route("[controller]/{studentId:guid}"), ActionName("GetStudent")]
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
        public async Task<IActionResult> UpdateStudent([FromRoute] Guid studentId, [FromBody] UpdateStudentRequest request)
        {
            if (!await studentRepository.Exists(studentId))
            {
                return NotFound();
            }

            var updatedStudent = await studentRepository.UpdateStudentAsync(studentId, mapper.Map<DataModels.Student>(request));
            if (updatedStudent is not null)
            {
                return Ok(mapper.Map<Student>(updatedStudent));
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> DeleteStudent([FromRoute] Guid studentId)
        {
            if (!await studentRepository.Exists(studentId))
            {
                return NotFound();
            }

            var student = await studentRepository.DeleteStudentAsync(studentId);
            return Ok(mapper.Map<Student>(student));
        }

        [HttpPost]
        [Route("[controller]/Add")]
        public async Task<IActionResult> AddStudent([FromBody] AddStudentRequest request)
        {
            var student = await studentRepository.AddStudentAsync(mapper.Map<DataModels.Student>(request));
            return CreatedAtAction(
                nameof(GetStudent),
                new { studentId = student.Id },
                mapper.Map<Student>(student));
        }

        [HttpPost]
        [Route("[controller]/{studentId:guid}/upload-image")]
        public async Task<IActionResult> UploadImage([FromRoute] Guid studentId, IFormFile profileImage)
        {
            if (profileImage == null || profileImage.Length == 0)
            {
                return NotFound();
            }

            var validExtensions = new List<string>()
            {
                "jpg",
                "jpeg",
                "png",
                "gif",
            };

            var extension = Path.GetExtension(profileImage.FileName);
            if (!validExtensions.Contains(extension))
            {
                return BadRequest("This is not a supported image format");
            }

            if (!await studentRepository.Exists(studentId))
            {
                return NotFound();
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(profileImage.FileName);
            var fileImagePath = await imageRepository.Upload(profileImage, fileName);

            if (await studentRepository.UpdateProfileImageAsync(studentId, fileImagePath))
            {
                return Ok(fileImagePath);
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Error uploading image");
        }
    }
}
