using API.Domain_Models;
using AutoMapper;

namespace API.Profiles.AfterMaps
{
    public class AddStudentRequestAfterMap : IMappingAction<AddStudentRequest, DataModels.Student>
    {
        public void Process(AddStudentRequest source, DataModels.Student destination, ResolutionContext context)
        {
            destination.Id = Guid.NewGuid();
            destination.Address = new DataModels.Address()
            {
                Id = new Guid(),
                PhysicalAddress = source.PhysicalAddress,
                PostalAddress = source.PostalAddress,
            };
        }
    }
}
