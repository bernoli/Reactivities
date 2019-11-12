using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            var query = new Application.Activities.List.Query();
            var result = await _mediator.Send(query);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            var query = new Application.Activities.Details.Query() { Id = id };
            var activity = await _mediator.Send(query);
            return activity;
        }

        [HttpPost]
        // Using Create.Command here is possible only because the [ApiController] class level attribute, is smart enough
        // to figure out Create.Command from the request. 
        // If we would not use [ApiController] we than needed to add to the method:
        // Create([FromBody]Create.Command command) which gives the controller a hint... 
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            var result = await _mediator.Send(command);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command() { Id = id });
        }
    }
}