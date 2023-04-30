using API.Domain_Models;
using API.Repositories;
using FluentValidation;

namespace API.Validators
{
    public class AddStudentRequestVallidator : AbstractValidator<AddStudentRequest>
    {
        public AddStudentRequestVallidator(IStudentRepository studentRepository)
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.DateOfBirth).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Mobile).NotEmpty();

            RuleFor(x => x.GenderId).NotEmpty()
            .Must(id =>
            {
                var gender = studentRepository.GetGendersAsync().Result.ToList().FirstOrDefault(x => x.Id == id);
                return gender != null;
            })
            .WithMessage("Please select a valid gender");

            RuleFor(x => x.PhysicalAddress).NotEmpty();
            RuleFor(x => x.PostalAddress).NotEmpty();
        }
    }
}