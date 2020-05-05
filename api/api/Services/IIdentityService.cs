/*
 * Created by: David Bottiau
 * https://github.com/Odonno/azuread-react-dotnet-core-example
 */


namespace api.Services
{
    public interface IIdentityService
    {
        bool IsAuthenticated();

        string GetMail();

        string GetId();


    }
}