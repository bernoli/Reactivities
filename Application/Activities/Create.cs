using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dbContext;

            public Handler(DataContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity()
                {
                    Id = request.Id,
                    Title = request.Title,
                    Date = request.Date,
                    Description = request.Description,
                    Category = request.Category,
                    City = request.City,
                    Venue = request.Venue,
                };

                _dbContext.Activities.Add(activity);
                var success = await _dbContext.SaveChangesAsync() > 0; // SaveChanges return the number of rows saved.
                if (success)
                {
                    return Unit.Value; // just to indicate that this was a successful operation.
                }
                throw new Exception("Problem saving changes.");
            }
        }
    }
}
