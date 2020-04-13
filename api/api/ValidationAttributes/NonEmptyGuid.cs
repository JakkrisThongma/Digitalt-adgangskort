/*
 * Ro
 * https://stackoverflow.com/a/60346385/10114764
 */

using System;
using System.ComponentModel.DataAnnotations;

namespace api.ValidationAttributes
{
    public class NonEmptyGuid : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if ((value is Guid) && Guid.Empty == (Guid) value)
            {
                return new ValidationResult("Id should be a non-empty Guid.");
            }

            return null;
        }
    }
}