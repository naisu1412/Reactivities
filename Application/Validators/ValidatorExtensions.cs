using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder.NotEmpty()
                .MinimumLength(6).WithMessage("Password must be at least 6 characters")
                .Matches("[A-Z]").WithMessage("Password Must Contain 1 uppercaseLetter")
                .Matches("[a-z]").WithMessage("Password Must Contain 1 lowercaseLetter")
                .Matches("[0-9]").WithMessage("Password Must Contain a number")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password Must Contain a non alphanumeric");

            return options;

        }
    }
}