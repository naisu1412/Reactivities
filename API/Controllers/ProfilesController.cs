using System;
using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username)
        {
            return await Mediator.Send(new Details.Query { Username = username });
        }

        [HttpPut("{username}")]
        public async Task<ActionResult<Unit>> Edit(string username, Edit.Command command)

        {
            command.username = username;
            return await Mediator.Send(command);
        }

      

    }
}