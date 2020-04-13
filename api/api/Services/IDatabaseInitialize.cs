using api.Entities;

namespace api.Services
{
    public interface IDatabaseInitialize
    {
        void Initialize(ApiContext apiContext);
    }
}