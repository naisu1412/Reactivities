using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string username { get; set; }
            public string DisplayName { get; set; }
            public string Bio { get; set; }


        }

        public class CommandValidator : AbstractValidator<Command>{
            public CommandValidator(){
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                if (user.UserName != request.username)
                    throw new RestException(HttpStatusCode.Unauthorized, new
                    {
                        User = "You cannot Edit Other's Profile"
                    });

                user.DisplayName = request.DisplayName;
                user.Bio = request.Bio;

                // handler logic goes here
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem in Saving changes");
            }
        }
    }
}