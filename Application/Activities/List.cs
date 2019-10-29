using System.Collections.Generic;
using System.Threading;
using Domain;
using MediatR;
using Persistence;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

// This is a recommanded pattern for writing Mediator handlers which are the Use Cases
namespace Application.Activities
{
    public class List
    {
        public class Query:IRequest<List<Activity>>{ // IRequest is from MediatR, in our case we return List<Activity>
            // we don't neet to add any properties.
        }

        // This is the handler responsible from bringing all the activities from database and return them.
        public class Handler : IRequestHandler<Query, List<Activity>> // receive Query (defined above), return List<Activity>
        {
            private readonly DataContext _dbContext;

            public Handler(DataContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await  _dbContext.Activities.ToListAsync();
                return activities;
            }
        }
    }
}