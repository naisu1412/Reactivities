using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activites;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // You can also derive from Controller but you dont need to use view support as you use react for that
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
            return await _mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(System.Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

    }
}