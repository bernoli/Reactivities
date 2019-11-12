using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var activity = await _dbContext.Activities.FindAsync(request.Id);
                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound,
                        new
                        {
                            activity = $"Could not find activity [{request.Id}]"
                        });
                }
                _dbContext.Activities.Remove(activity);
                var success = await _dbContext.SaveChangesAsync() > 0; // SaveChanges return the number of rows saved.
                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes.");
            }
        }
    }
}